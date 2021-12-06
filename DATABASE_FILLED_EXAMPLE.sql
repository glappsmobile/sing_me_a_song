--
-- PostgreSQL database dump
--

-- Dumped from database version 13.5 (Ubuntu 13.5-2.pgdg20.04+1)
-- Dumped by pg_dump version 13.5 (Ubuntu 13.5-0ubuntu0.21.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: genres; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.genres (
    id integer NOT NULL,
    name character varying(255) NOT NULL
);


--
-- Name: genres_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.genres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: genres_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.genres_id_seq OWNED BY public.genres.id;


--
-- Name: songs; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.songs (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    youtube_link character varying(255) NOT NULL,
    score integer DEFAULT 0 NOT NULL
);


--
-- Name: songs_genres; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.songs_genres (
    id integer NOT NULL,
    song_id integer NOT NULL,
    genre_id integer NOT NULL
);


--
-- Name: songs_genres_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.songs_genres_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: songs_genres_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.songs_genres_id_seq OWNED BY public.songs_genres.id;


--
-- Name: songs_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.songs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: songs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.songs_id_seq OWNED BY public.songs.id;


--
-- Name: genres id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.genres ALTER COLUMN id SET DEFAULT nextval('public.genres_id_seq'::regclass);


--
-- Name: songs id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.songs ALTER COLUMN id SET DEFAULT nextval('public.songs_id_seq'::regclass);


--
-- Name: songs_genres id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.songs_genres ALTER COLUMN id SET DEFAULT nextval('public.songs_genres_id_seq'::regclass);


--
-- Data for Name: genres; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.genres (id, name) FROM stdin;
1	Folk
2	Rock
3	Bluegrass
4	Alternative
5	Pop rock
6	Indie
7	Country
8	Techno
9	EDM
10	Pop
11	Funk
\.


--
-- Data for Name: songs; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.songs (id, name, youtube_link, score) FROM stdin;
12	Missed The Boat	https://www.youtube.com/watch?v=YSfTdzoO4ic	15
5	Rye Whiskey	https://www.youtube.com/watch?v=jXfE-e4a3GU	19
13	Where Is My Mind?	https://www.youtube.com/watch?v=49FB9hhoO6c	7
6	Round And Round	https://www.youtube.com/watch?v=op5Nzr-17Lk	19
10	Paranoia In B Flat Major	https://www.youtube.com/watch?v=-4pjrmH967c	19
8	Thunder	https://www.youtube.com/watch?v=4AqjqOqNrjw	12
11	The Weight of Lies	https://www.youtube.com/watch?v=simzHw7Ilwk	9
14	The Stars Are Projectors	https://www.youtube.com/watch?v=jRk1R0FKaek	34
2	Fly Trapped In A Jar	https://www.youtube.com/watch?v=23RlR-tWjZQ	4
7	Where Is The Love?	https://www.youtube.com/watch?v=WpYeekQkAdc	10
4	Spitting Venom	https://www.youtube.com/watch?v=-eifPUvi7kA	57
3	If it's the beaches	https://www.youtube.com/watch?v=wP--MPBW_kQ	10
15	Rap do Minecraft	https://www.youtube.com/watch?v=4iG76Wrb2To	-5
\.


--
-- Data for Name: songs_genres; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.songs_genres (id, song_id, genre_id) FROM stdin;
4	2	2
5	3	7
6	4	2
7	4	4
8	4	6
9	5	3
10	6	5
11	7	8
12	7	9
13	8	5
15	10	1
16	10	3
17	11	1
18	11	3
19	12	2
20	12	4
21	12	6
22	13	2
23	13	4
24	13	6
25	14	2
26	14	4
27	14	6
28	15	9
\.


--
-- Name: genres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.genres_id_seq', 11, true);


--
-- Name: songs_genres_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.songs_genres_id_seq', 28, true);


--
-- Name: songs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.songs_id_seq', 15, true);


--
-- Name: genres genres_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.genres
    ADD CONSTRAINT genres_pk PRIMARY KEY (id);


--
-- Name: songs_genres songs_genres_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.songs_genres
    ADD CONSTRAINT songs_genres_pk PRIMARY KEY (id);


--
-- Name: songs songs_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.songs
    ADD CONSTRAINT songs_pk PRIMARY KEY (id);


--
-- Name: songs_genres songs_genres_fk0; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.songs_genres
    ADD CONSTRAINT songs_genres_fk0 FOREIGN KEY (song_id) REFERENCES public.songs(id);


--
-- Name: songs_genres songs_genres_fk1; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.songs_genres
    ADD CONSTRAINT songs_genres_fk1 FOREIGN KEY (genre_id) REFERENCES public.genres(id);


--
-- PostgreSQL database dump complete
--
