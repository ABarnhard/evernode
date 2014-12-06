CREATE OR REPLACE FUNCTION add_photos(url_string varchar, nid integer)
RETURNS integer AS $$
DECLARE
  result integer;
  urls varchar[];
  url_string varchar;
BEGIN
  -- turn string into array
  SELECT string_to_array(url_string, ',') INTO urls;

  FOREACH url_string IN ARRAY urls
  LOOP
    INSERT INTO photos (url,note_id) VALUES (url_string, nid) RETURNING id INTO result;
  END LOOP;

  RETURN result;

end;
$$ language plpgsql;
