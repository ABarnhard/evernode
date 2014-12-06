CREATE TABLE notes_tags(
  note_id INTEGER NOT NULL REFERENCES notes(id),
  tag_id INTEGER NOT NULL REFERENCES tags(id)
);