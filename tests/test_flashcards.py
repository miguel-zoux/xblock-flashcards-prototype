"""Tests for the FlashcardsPrototypeXBlock."""

import json
from importlib.metadata import entry_points

import pytest
from lxml import etree
from webob import Request
from xblock.fields import ScopeIds
from xblock.test.toy_runtime import ToyRuntime

from flashcards_prototype import FlashcardsPrototypeXBlock
from flashcards_prototype.flashcards import MAX_CARDS, _sanitize_card_html, _strip_html_tags


def test_student_view_json_data():
    """Test the data structure returned by student_view."""
    scope_ids = ScopeIds("1", "2", "3", "4")
    block = FlashcardsPrototypeXBlock(ToyRuntime(), scope_ids=scope_ids)
    frag = block.student_view()
    as_dict = frag.to_dict()
    assert "title" in as_dict["json_init_args"]
    assert "intro" in as_dict["json_init_args"]
    assert "flashcards" in as_dict["json_init_args"]
    assert "styling" not in as_dict["json_init_args"]
    assert "url" in as_dict["json_init_args"]
    assert "launchImageUrl" in as_dict["json_init_args"]
    assert "cssUrl" in as_dict["json_init_args"]
    assert as_dict["json_init_args"]["usageId"] == "4"


def test_studio_view_json_data():
    """Test the data structure returned by studio_view."""
    scope_ids = ScopeIds("1", "2", "3", "4")
    block = FlashcardsPrototypeXBlock(ToyRuntime(), scope_ids=scope_ids)
    frag = block.studio_view()
    as_dict = frag.to_dict()
    assert "title" in as_dict["json_init_args"]
    assert "flashcards" in as_dict["json_init_args"]
    assert "styling" not in as_dict["json_init_args"]
    assert "url" in as_dict["json_init_args"]


def test_export_xml_with_list_content_succeeds():
    """
    Verify that exporting produces valid OLX for list content.

    The export should produce ``<flashcard>`` child elements rather than
    trying to assign the raw Python list to the XML node text.
    """
    scope_ids = ScopeIds("1", "flashcards_prototype", "3", "4")
    block = FlashcardsPrototypeXBlock(ToyRuntime(), scope_ids=scope_ids)
    block.display_name = "Capitals"
    block.content = [
        {"front": "Croatia", "back": "Zagreb"},
        {"front": "France", "back": "Paris"},
    ]

    node = etree.Element("root")
    block.add_xml_to_node(node)  # must not raise

    assert node.tag == "flashcards_prototype"
    assert node.get("display_name") == "Capitals"
    assert node.get("xblock-family") == "xblock.v1"

    # title must not appear; display_name is the standard OLX attr
    assert node.get("title") is None

    children = list(node)
    assert len(children) == 2

    assert children[0].tag == "flashcard"
    assert children[0].get("front") == "Croatia"
    assert children[0].get("back") == "Zagreb"

    assert children[1].tag == "flashcard"
    assert children[1].get("front") == "France"
    assert children[1].get("back") == "Paris"


def test_export_xml_with_empty_content():
    """Export should also succeed when content is empty."""
    scope_ids = ScopeIds("1", "flashcards_prototype", "3", "4")
    block = FlashcardsPrototypeXBlock(ToyRuntime(), scope_ids=scope_ids)
    block.content = []

    node = etree.Element("root")
    block.add_xml_to_node(node)

    assert node.tag == "flashcards_prototype"
    assert list(node) == []  # no child elements


def test_export_parse_round_trip_with_styling():
    """Export then re-parse via 3-arg calling convention recovers display_name, content, and custom styling."""
    scope_ids = ScopeIds("1", "flashcards_prototype", "3", "4")
    block = FlashcardsPrototypeXBlock(ToyRuntime(), scope_ids=scope_ids)
    block.display_name = "Styled"
    block.content = [{"front": "Q", "back": "A"}]
    block.styling = {
        "fontSize": "24px",
        "backgroundColor": "#ffffff",
        "textColor": "#000000",
        "borderColor": "#cccccc",
    }

    node = etree.Element("root")
    block.add_xml_to_node(node)

    # parse_xml(node, runtime, keys) — the canonical 3-arg OLX import call
    parsed = FlashcardsPrototypeXBlock.parse_xml(
        node,
        ToyRuntime(),
        ScopeIds("1", "flashcards_prototype", "3", "4"),
    )
    assert parsed.display_name == "Styled"
    assert parsed.content == [{"front": "Q", "back": "A"}]
    assert parsed.styling == {
        "fontSize": "24px",
        "backgroundColor": "#ffffff",
        "textColor": "#000000",
        "borderColor": "#cccccc",
    }


def test_import_legacy_title_attribute():
    """
    parse_xml should still handle legacy ``title`` attribute for backward compatibility.

    Old OLX files written with ``title="..."`` must import correctly by mapping
    the legacy attr to ``display_name``.
    """
    xml = '<flashcards title="Legacy Cards"><flashcard front="Q1" back="A1"/></flashcards>'
    node = etree.fromstring(xml)
    parsed = FlashcardsPrototypeXBlock.parse_xml(
        node,
        ToyRuntime(),
        ScopeIds("1", "flashcards_prototype", "3", "4"),
    )
    assert parsed.display_name == "Legacy Cards"
    assert parsed.content == [{"front": "Q1", "back": "A1"}]


def test_import_display_name_trumps_legacy_title():
    """When both ``display_name`` and legacy ``title`` are present, ``display_name`` wins."""
    xml = '<flashcards display_name="New Name" title="Old Name"><flashcard front="Q" back="A"/></flashcards>'
    node = etree.fromstring(xml)
    parsed = FlashcardsPrototypeXBlock.parse_xml(
        node,
        ToyRuntime(),
        ScopeIds("1", "flashcards_prototype", "3", "4"),
    )
    assert parsed.display_name == "New Name"


def test_index_dictionary_indexes_fronts_only():
    """index_dictionary should index display_name and card fronts, never the backs or styling."""
    scope_ids = ScopeIds("1", "flashcards_prototype", "3", "4")
    block = FlashcardsPrototypeXBlock(ToyRuntime(), scope_ids=scope_ids)
    block.display_name = "Capitals"
    block.content = [
        {"front": "<p>Croatia</p>", "back": "Zagreb"},
        {"front": "France", "back": "Paris"},
    ]

    index = block.index_dictionary()

    assert index["content_type"] == "Flashcards"
    assert index["content"]["display_name"] == "Capitals"
    # HTML tags in fronts are stripped before indexing.
    assert index["content"]["flashcards_content"] == "Croatia France"
    # The backs (answers) must not leak into the search index.
    flattened = str(index)
    assert "Zagreb" not in flattened
    assert "Paris" not in flattened
    # Styling is not indexed.
    assert "styling" not in index["content"]


def test_index_dictionary_with_empty_content():
    """index_dictionary should handle an empty card list gracefully."""
    scope_ids = ScopeIds("1", "flashcards_prototype", "3", "4")
    block = FlashcardsPrototypeXBlock(ToyRuntime(), scope_ids=scope_ids)
    block.content = []

    index = block.index_dictionary()

    assert index["content_type"] == "Flashcards"
    assert index["content"]["flashcards_content"] == ""


def test_import_no_title_fallback_default():
    """When neither display_name nor title is present, parse_xml defaults to "Flashcards (Prototype)"."""
    xml = '<flashcards><flashcard front="Q" back="A"/></flashcards>'
    node = etree.fromstring(xml)
    parsed = FlashcardsPrototypeXBlock.parse_xml(
        node,
        ToyRuntime(),
        ScopeIds("1", "flashcards_prototype", "3", "4"),
    )
    assert parsed.display_name == "Flashcards (Prototype)"


def test_strip_html_hardening():
    """Script/style contents are dropped and markup edge cases are handled."""
    assert _strip_html_tags('<script src="x.js">secret()</script>visible') == "visible"
    assert _strip_html_tags("<style>.a{color:red}</style>styled") == "styled"
    assert _strip_html_tags('<img alt="a > b">text') == "text"
    assert _strip_html_tags("<p>foo</p><p>bar</p>") == "foo bar"
    assert _strip_html_tags("see https://example.com <!-- hidden -->") == "see https://example.com"
    assert _strip_html_tags(None) == ""


def test_studio_submit_saves_intro_and_keeps_it_when_missing():
    """The Studio editor saves the intro; older editors that don't send it leave it alone."""
    scope_ids = ScopeIds("1", "2", "3", "4")
    block = FlashcardsPrototypeXBlock(ToyRuntime(), scope_ids=scope_ids)
    data = {"title": "Deck", "intro": "Let's review", "flashcards": [{"front": "Q", "back": "A"}]}
    block.handle("studio_submit", _json_request(data))
    assert block.intro == "Let's review"

    del data["intro"]
    block.handle("studio_submit", _json_request(data))
    assert block.intro == "Let's review"


def test_export_parse_round_trip_with_intro():
    """The intro survives OLX export and import."""
    scope_ids = ScopeIds("1", "flashcards_prototype", "3", "4")
    block = FlashcardsPrototypeXBlock(ToyRuntime(), scope_ids=scope_ids)
    block.intro = "Custom intro"
    block.content = [{"front": "Q", "back": "A"}]

    node = etree.Element("root")
    block.add_xml_to_node(node)
    assert node.get("intro") == "Custom intro"

    parsed = FlashcardsPrototypeXBlock.parse_xml(node, ToyRuntime(), ScopeIds("1", "flashcards_prototype", "3", "4"))
    assert parsed.intro == "Custom intro"


def _make_block() -> FlashcardsPrototypeXBlock:
    return FlashcardsPrototypeXBlock(ToyRuntime(), scope_ids=ScopeIds("1", "flashcards_prototype", "3", "4"))


def test_entry_point_registered():
    """The package registers the block under the ``flashcards_prototype`` tag."""
    matches = [ep for ep in entry_points(group="xblock.v1") if ep.name == "flashcards_prototype"]
    if not matches:
        pytest.skip("flashcards-prototype is not installed in this environment (tox uses skipsdist)")
    assert matches[0].load() is FlashcardsPrototypeXBlock


def test_sanitize_card_html_strips_scripts_and_handlers():
    """Dangerous markup is removed; basic formatting and safe inline styles stay."""
    cleaned = _sanitize_card_html(
        '<p style="color: red; position: fixed" onclick="x()">Hi <strong>there</strong></p>'
        '<img src="cat.png" alt="cat" onerror="alert(1)"><script>alert(1)</script>'
        '<iframe src="https://example.com"></iframe><a href="javascript:alert(1)">link</a>'
    )
    assert "onclick" not in cleaned
    assert "onerror" not in cleaned
    assert "<script" not in cleaned
    assert "<iframe" not in cleaned
    assert "javascript:" not in cleaned
    assert "position" not in cleaned
    assert 'style="color:red"' in cleaned
    assert "<strong>there</strong>" in cleaned
    assert '<img src="cat.png" alt="cat">' in cleaned


def test_studio_submit_sanitizes_card_html():
    """Card HTML from Studio is cleaned before it is stored."""
    block = _make_block()
    card = {"front": "<img src=x onerror=alert(1)>Q", "back": "<script>bad()</script>A"}
    data = {"title": "Deck", "flashcards": [card]}
    response = block.handle("studio_submit", _json_request(data))
    assert response.status_code == 200
    assert block.content == [{"front": '<img src="x">Q', "back": "A"}]


def test_import_sanitizes_card_html():
    """Card HTML in imported OLX is cleaned too."""
    xml = (
        "<flashcards_prototype>"
        '<flashcard front="&lt;b onmouseover=x()&gt;Q&lt;/b&gt;" back="A"/>'
        "</flashcards_prototype>"
    )
    parsed = FlashcardsPrototypeXBlock.parse_xml(
        etree.fromstring(xml), ToyRuntime(), ScopeIds("1", "flashcards_prototype", "3", "4")
    )
    assert parsed.content == [{"front": "<b>Q</b>", "back": "A"}]


def test_import_tolerates_missing_front_or_back():
    """A <flashcard> without front/back imports as an empty side instead of crashing."""
    xml = '<flashcards_prototype><flashcard front="Q"/></flashcards_prototype>'
    parsed = FlashcardsPrototypeXBlock.parse_xml(
        etree.fromstring(xml), ToyRuntime(), ScopeIds("1", "flashcards_prototype", "3", "4")
    )
    assert parsed.content == [{"front": "Q", "back": ""}]


@pytest.mark.parametrize(
    "data",
    [
        ["not", "an", "object"],
        {"title": "Deck"},
        {"title": "Deck", "flashcards": None},
        {"title": "Deck", "flashcards": "Q;A"},
        {"title": "Deck", "flashcards": ["Q"]},
        {"title": "Deck", "flashcards": [{"front": "Q"}]},
        {"title": "Deck", "flashcards": [{"front": "Q", "back": 3}]},
        {"title": 5, "flashcards": []},
        {"title": "Deck", "intro": ["x"], "flashcards": []},
    ],
)
def test_studio_submit_rejects_malformed_input(data: object):
    """Malformed saves get a 400 and leave the block unchanged."""
    block = _make_block()
    block.content = [{"front": "Q", "back": "A"}]
    response = block.handle("studio_submit", _json_request(data))
    assert response.status_code == 400
    assert "error" in json.loads(response.body)
    assert block.content == [{"front": "Q", "back": "A"}]


def test_studio_submit_enforces_card_limit():
    """Decks over MAX_CARDS are rejected."""
    block = _make_block()
    cards = [{"front": f"Q{i}", "back": "A"} for i in range(MAX_CARDS + 1)]
    response = block.handle("studio_submit", _json_request({"title": "Deck", "flashcards": cards}))
    assert response.status_code == 400
    assert str(MAX_CARDS) in json.loads(response.body)["error"]

    response = block.handle("studio_submit", _json_request({"title": "Deck", "flashcards": cards[:MAX_CARDS]}))
    assert response.status_code == 200
    assert len(block.content) == MAX_CARDS


def test_studio_submit_blank_title_uses_default():
    """An empty title falls back to the default display name instead of being saved blank."""
    block = _make_block()
    block.handle("studio_submit", _json_request({"title": "   ", "flashcards": []}))
    assert block.display_name == "Flashcards (Prototype)"


def test_export_skips_malformed_content():
    """Export doesn't crash on content that isn't a list of dicts (e.g. old or hand-edited data)."""
    block = _make_block()
    block.content = [{"front": "Q", "back": "A"}, "junk"]
    node = etree.Element("root")
    block.add_xml_to_node(node)
    assert [child.get("front") for child in node] == ["Q"]


def _json_request(data: object) -> Request:
    """Build a WebOb request carrying JSON, as the XBlock runtime does for json_handler."""
    request = Request.blank("/")
    request.method = "POST"
    request.body = json.dumps(data).encode("utf-8")
    return request
