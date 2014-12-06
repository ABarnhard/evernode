CREATE OR REPLACE FUNCTION add_note(user_id integer, title varchar, body text, tags varchar)
RETURNS integer AS $$
DECLARE

  nid integer;
  tid integer;
  names varchar[];
  tagname varchar;

BEGIN

  -- insert the note
  INSERT INTO notes (title, body, user_id) VALUES (title, body, user_id) RETURNING id INTO nid;
  -- turn string into array
  SELECT string_to_array(tags, ',') INTO names;
  RAISE NOTICE 'nid: %', nid;
  RAISE NOTICE 'names: %', names;
  -- create temp table
  create temp table tagger on commit drop as select nid, t.id as tid, t.name as tname from tags t where t.name = any(names);

  -- looping over all the tags
  foreach tagname in array names
  loop
    tid := (select t.tid from tagger t where t.tname = tagname);
    raise notice 'tid: %', tid;

    -- if the tag does not exist, then insert it
    IF tid is null then
      insert into tags (name) values (tagname) returning id into tid;
      insert into tagger values (nid, tid, tagname);
    end if;
  end loop;

  -- take the temp table and insert it into the join table
  insert into notes_tags select t.nid, t.tid from tagger t;
  -- return the note id
  return nid;

end;
$$ language plpgsql;