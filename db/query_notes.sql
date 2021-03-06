CREATE OR REPLACE FUNCTION query_notes (uid integer, lmt integer, ofst integer, fltr varchar)
RETURNS TABLE ("noteCount" integer, "noteId" integer, title varchar, body text, "updatedAt" timestamp, "tagIds" integer[], "tagNames" varchar[]) AS $$
DECLARE
  note_count integer;
BEGIN
  SELECT count(distinct n.id) 
  FROM notes n 
  LEFT OUTER JOIN notes_tags nt ON n.id = nt.note_id
  LEFT OUTER JOIN tags t ON nt.tag_id = t.id 
  WHERE n.user_id = uid AND t.name LIKE fltr 
  GROUP BY n.user_id 
  INTO note_count;
  
  RETURN QUERY
    SELECT note_count AS "noteCount", n.id AS "noteId", n.title, n.body, n.updated_at AS "updatedAt", array_agg(t.id) AS "tagIds", array_agg(t.name) AS "tagNames"
    FROM notes n
    LEFT OUTER JOIN notes_tags nt ON n.id = nt.note_id
    LEFT OUTER JOIN tags t ON nt.tag_id = t.id 
    WHERE n.user_id = uid AND t.name LIKE fltr
    GROUP BY n.id
    ORDER BY n.updated_at DESC
    OFFSET ofst
    LIMIT lmt;

END;
$$ language plpgsql;
