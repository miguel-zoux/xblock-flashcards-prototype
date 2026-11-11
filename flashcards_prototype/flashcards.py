"""
An XBlock for displaying flashcards.

Flashcards XBlock allows the editor to add a list of questions and
answers (separated by a semicolon) which are then displayed as flashcards.
"""

import html

import nh3
from lxml import etree
from web_fragments.fragment import Fragment
from xblock.core import XBlock
from xblock.exceptions import JsonHandlerError
from xblock.fields import Dict, List, Scope, String
from xblock.utils.resources import ResourceLoader

DEFAULT_DISPLAY_NAME = "Flashcards (Prototype)"

# Upper bound on cards per deck. The whole deck is stored in one field and sent to
# every learner on every view, so very large decks make pages slow.
MAX_CARDS = 500

# Inline styles TinyMCE produces for basic formatting. Everything else is dropped.
_ALLOWED_STYLE_PROPERTIES = {
    "color",
    "background-color",
    "text-align",
    "text-decoration",
    "font-weight",
    "font-style",
    "padding-left",
    "width",
    "height",
}
_ALLOWED_ATTRIBUTES = {tag: set(attrs) for tag, attrs in nh3.ALLOWED_ATTRIBUTES.items()}
_ALLOWED_ATTRIBUTES["*"] = _ALLOWED_ATTRIBUTES.get("*", set()) | {"style"}


def _sanitize_card_html(value: str) -> str:
    """
    Clean author HTML before it is stored, because the learner view renders it as HTML.

    Uses nh3's default tag allowlist (formatting, lists, links, images, tables) plus a
    small set of inline styles. Scripts, event handlers, iframes and ``javascript:``
    links are removed.
    """
    return nh3.clean(
        value or "",
        attributes=_ALLOWED_ATTRIBUTES,
        filter_style_properties=_ALLOWED_STYLE_PROPERTIES,
    )


def _clean_cards(cards: list) -> list[dict[str, str]]:
    """Sanitize every card's front and back."""
    return [{"front": _sanitize_card_html(card["front"]), "back": _sanitize_card_html(card["back"])} for card in cards]


def _validate_submission(data: object) -> tuple[str, str | None, list[dict[str, str]]]:
    """
    Check the Studio save payload and return ``(title, intro, cards)``.

    Raises ``JsonHandlerError(400)`` with a readable message when the payload is malformed.
    ``intro`` is ``None`` when the editor didn't send it.
    """
    if not isinstance(data, dict):
        raise JsonHandlerError(400, "The request body must be a JSON object.")

    title = data.get("title", "")
    if not isinstance(title, str):
        raise JsonHandlerError(400, "The title must be text.")
    title = title.strip() or DEFAULT_DISPLAY_NAME

    intro = data.get("intro")
    if intro is not None and not isinstance(intro, str):
        raise JsonHandlerError(400, "The introduction must be text.")

    cards = data.get("flashcards")
    if not isinstance(cards, list):
        raise JsonHandlerError(400, "The flashcards must be a list.")
    if len(cards) > MAX_CARDS:
        raise JsonHandlerError(400, f"A deck can have at most {MAX_CARDS} flashcards.")
    for number, card in enumerate(cards, start=1):
        if not (isinstance(card, dict) and isinstance(card.get("front"), str) and isinstance(card.get("back"), str)):
            raise JsonHandlerError(400, f"Flashcard {number} must have a text front and back.")

    return title, intro, _clean_cards(cards)


def _strip_html_tags(text: str) -> str:
    """Reduce HTML to searchable plain text; script/style contents are dropped."""
    text = (text or "").replace("<", " <")
    return " ".join(html.unescape(nh3.clean(text, tags=set())).split())


class FlashcardsPrototypeXBlock(XBlock):
    """
    The FlashcardsPrototypeXBlock class.

    The content (the values between the <flashcards> tags) is saved as a
    list of flashcard objects and passed as an array to the HTML template.
    """

    loader = ResourceLoader(__name__)
    display_name = String(
        display_name="Display Name",
        default=DEFAULT_DISPLAY_NAME,  # type: ignore[assignment]
        scope=Scope.settings,
        help="The title of the XBlock. It is displayed to the learners.",
    )

    intro = String(
        display_name="Introduction",
        default=(
            "Hi! 👋 Let's pause for a quick review. You'll see a term, try to remember what it means, "
            "before revealing the answer. Select whether you got it right or wrong, and practice the ones you missed"
        ),  # type: ignore[assignment]
        scope=Scope.settings,
        help="The text on the launch card, under the title. Keep it to about six lines.",
    )

    content = List(default=[], scope=Scope.settings, help="List of items")  # type: ignore[assignment]
    styling = Dict(
        default={
            # Warning: consider backward compatibility before making any changes to keys.
            "fontSize": "16px",
            "backgroundColor": "#f8f9fa",
            "textColor": "#212529",
            "borderColor": "#dee2e6",
        },
        scope=Scope.settings,
        help=(
            "Legacy per-block colours and font size from the original Flashcards block. No longer shown or "
            "edited: styling comes from the shared design system. Kept so existing content and OLX still load."
        ),
    )

    def student_view(self, context: dict | None = None) -> Fragment:
        """Create fragment and send the appropriate context."""
        context = {
            "title": self.display_name,
            "intro": self.intro,
            "flashcards": self.content,
            "url": self.runtime.local_resource_url(self, "public/student-ui.js"),
            # The view renders in a shadow root and loads this stylesheet there, so LMS
            # styles can't reach in. It's also added to the page below for the fonts.
            "cssUrl": self.runtime.local_resource_url(self, "public/student-ui.css"),
            # Lets the view open this block alone in the learning app's window-sized modal.
            "usageId": str(self.scope_ids.usage_id),
            # Prototype only: the illustration from the Figma design. Check its licence
            # before real use, and give authors an image field instead.
            "launchImageUrl": self.runtime.local_resource_url(self, "public/images/launch-illustration.png"),
        }

        frag = Fragment()
        frag.add_javascript(self.loader.load_unicode("static/js/student.js"))
        frag.add_css_url(self.runtime.local_resource_url(self, "public/student-ui.css"))
        frag.initialize_js("FlashcardsPrototypeBlock", context)
        return frag

    @classmethod
    def parse_xml(cls, node, runtime, keys) -> XBlock:  # noqa: ANN001
        """
        Parse the XML for a Flashcards block during OLX import.

        The content between the <flashcards> blocks is transformed
        into a list of flashcard dicts and stored as ``content``.

        ``styling``, ``intro`` and ``display_name`` are recovered from XML
        attributes when present.
        """
        block = runtime.construct_xblock_from_class(cls, keys)

        # Imported OLX is sanitized the same way as a Studio save.
        block.content = _clean_cards(
            [
                {"front": element.attrib.get("front", ""), "back": element.attrib.get("back", "")}
                for element in node.iter("flashcard")
            ]
        )

        block.display_name = node.attrib.get("display_name") or node.attrib.get("title", DEFAULT_DISPLAY_NAME)

        if "intro" in node.attrib:
            block.intro = node.attrib["intro"]

        styling_attr = node.attrib.get("styling")
        if styling_attr:
            block.styling = block.fields["styling"].from_string(styling_attr)

        return block

    def add_xml_to_node(self, node):  # noqa: ANN001
        """
        Serialize this XBlock to XML for OLX export.

        The ``content`` list is exported as ``<flashcard>`` child elements,
        matching the format that ``parse_xml`` expects.
        """
        node.tag = self.xml_element_name()
        node.set("xblock-family", self.entry_point)

        # Export remaining fields (skip content — handled as children below).
        for field_name, field in self.fields.items():
            if field_name in ("children", "parent", "content"):
                continue
            if field.is_set_on(self) or field.force_export:
                self._add_field(node, field_name, field)

        # Export content list as <flashcard> child elements.
        for card in self.content or []:
            if not isinstance(card, dict):
                continue
            child = etree.SubElement(node, "flashcard")
            child.set("front", card.get("front", ""))
            child.set("back", card.get("back", ""))

    def index_dictionary(self) -> dict:
        """
        Return the block's searchable content for search.

        Only the display name and each card's front (the prompt) are indexed.
        """
        xblock_body = super().index_dictionary()
        # Index only the card fronts (prompts); the backs are excluded.
        cards_text = " ".join(
            _strip_html_tags(card.get("front") or "") for card in (self.content or []) if isinstance(card, dict)
        )
        index_body = {
            "display_name": self.display_name,
            "flashcards_content": " ".join(cards_text.split()),
        }
        if "content" in xblock_body:
            xblock_body["content"].update(index_body)
        else:
            xblock_body["content"] = index_body
        xblock_body["content_type"] = "Flashcards"
        return xblock_body

    @staticmethod
    def workbench_scenarios() -> list[tuple[str, str]]:
        """A canned scenario for display in the workbench."""
        return [
            (
                "FlashcardsPrototypeXBlock",
                """<vertical_demo>
                <flashcards_prototype display_name="Capital cities">
<flashcard front="Croatia" back="Zagreb" />
<flashcard front="France" back="Paris" />
                </flashcards_prototype>
                </vertical_demo>
             """,
            ),
        ]

    def studio_view(self, context: dict | None = None) -> Fragment:
        """Create a fragment used to display the edit view in the Studio."""
        context = {
            "title": self.display_name,
            "intro": self.intro,
            "flashcards": self.content,
            "url": self.runtime.local_resource_url(self, "public/studio-ui.js"),
        }

        frag = Fragment(self.loader.render_django_template("static/html/studio.html", context=context))
        frag.add_javascript(self.loader.load_unicode("static/js/studio.js"))
        frag.add_css_url(self.runtime.local_resource_url(self, "public/studio-ui.css"))
        frag.initialize_js("FlashcardsPrototypeEditor", context)
        return frag

    @XBlock.json_handler
    def studio_submit(self, data: dict, suffix: str = "") -> dict[str, str]:  # noqa: ARG002
        """
        Save the Studio editor's form.

        Expects ``{"title": str, "intro": str (optional), "flashcards": [{"front": str, "back": str}]}``.
        Card HTML is sanitized before saving. Malformed input gets a 400 response.
        """
        title, intro, cards = _validate_submission(data)
        self.display_name = title
        self.content = cards
        if intro is not None:
            self.intro = intro
        return {"result": "success"}
