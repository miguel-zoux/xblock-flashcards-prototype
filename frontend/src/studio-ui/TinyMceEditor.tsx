import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

// TinyMCE so the global var exists
import 'tinymce/tinymce';
// DOM model
import 'tinymce/models/dom/model';
// Theme
import 'tinymce/themes/silver';
// Toolbar icons
import 'tinymce/icons/default';
// Editor styles
import 'tinymce/skins/ui/oxide/skin';
// Content styles, including inline UI like fake cursors
import 'tinymce/skins/content/default/content';
import 'tinymce/skins/ui/oxide/content';

// importing the plugin js.
// if you use a plugin that is not listed here the editor will fail to load
import 'tinymce/plugins/advlist';
// import 'tinymce/plugins/anchor';
import 'tinymce/plugins/autolink';
// import 'tinymce/plugins/autoresize';
// import 'tinymce/plugins/autosave';
// import 'tinymce/plugins/charmap';
import 'tinymce/plugins/code';
// import 'tinymce/plugins/codesample';
import 'tinymce/plugins/directionality';
// import 'tinymce/plugins/emoticons';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/help';
import 'tinymce/plugins/help/js/i18n/keynav/en';
import 'tinymce/plugins/image';
// import 'tinymce/plugins/importcss';
import 'tinymce/plugins/link';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/media';
import 'tinymce/plugins/nonbreaking';
import 'tinymce/plugins/quickbars';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/table';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/visualchars';

// importing plugin resources
// import 'tinymce/plugins/emoticons/js/emojis';

interface TinyMceEditorProps {
  value: string;
  onChange: (value: string) => void;
  /** Lets a <label htmlFor> point at the editor. */
  id?: string;
}

// Card styling comes from the design system now, so the editor shows plain text.
function TinyMceEditor({ value, onChange, id }: TinyMceEditorProps) {
  return (
    <div className="tinymce-wrapper">
      <Editor
        id={id}
        licenseKey="gpl"
        value={value}
        onEditorChange={(newValue) => onChange(newValue)}
        init={{
          promotion: false,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image',
            'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'media', 'table', 'code', 'help',
          ],
          toolbar: [
            'undo redo | blocks | bold italic forecolor | alignleft aligncenter '
                      + 'alignright alignjustify | bullist numlist outdent indent | ',
            'link unlink | image media | table | removeformat | code | fullscreen | help',
          ],
          skin_url: 'default',
        }}
      />
    </div>
  );
}

export default TinyMceEditor;
