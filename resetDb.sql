TRUNCATE TABLE spaces CASCADE;
SELECT setval('spaces_id_seq', select max(id) from spaces);