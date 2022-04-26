--
-- PostgreSQL database dump
--

-- Dumped from database version 12.3 (Debian 12.3-1.pgdg100+1)
-- Dumped by pg_dump version 13.2

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

DROP DATABASE IF EXISTS database_appeal;
--
-- Name: database_appeal; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE database_appeal WITH TEMPLATE = template0 ENCODING = 'UTF8';


ALTER DATABASE database_appeal OWNER TO postgres;

\connect database_appeal

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
-- Name: appeal; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appeal (
    id bigint NOT NULL,
    version bigint NOT NULL,
    title character varying(255) NOT NULL,
    created_at timestamp without time zone NOT NULL,
    geo_position_id bigint NOT NULL,
    owner_token character varying(255) NOT NULL,
    status character varying(255) NOT NULL,
    authorid bigint NOT NULL,
    description character varying(255) NOT NULL
);


ALTER TABLE public.appeal OWNER TO postgres;

--
-- Name: appeal_appeal_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appeal_appeal_category (
    appeal_categoris_id bigint NOT NULL,
    appeal_category_id bigint
);


ALTER TABLE public.appeal_appeal_category OWNER TO postgres;

--
-- Name: appeal_attachments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appeal_attachments (
    appeal_id bigint NOT NULL,
    attachments_string character varying(255),
    attachments_idx integer
);


ALTER TABLE public.appeal_attachments OWNER TO postgres;

--
-- Name: appeal_category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.appeal_category (
    id bigint NOT NULL,
    version bigint NOT NULL,
    name character varying(255) NOT NULL,
    image_url character varying(255) NOT NULL,
    description character varying(255) NOT NULL
);


ALTER TABLE public.appeal_category OWNER TO postgres;

--
-- Name: comments; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.comments (
    id bigint NOT NULL,
    version bigint NOT NULL,
    created_at timestamp without time zone NOT NULL,
    created_by bigint NOT NULL,
    content character varying(255) NOT NULL,
    appeal_id bigint NOT NULL,
    enabled character varying(255) NOT NULL
);


ALTER TABLE public.comments OWNER TO postgres;

--
-- Name: geo_position; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.geo_position (
    id bigint NOT NULL,
    version bigint NOT NULL,
    lat double precision NOT NULL,
    lon double precision NOT NULL,
    fullname character varying(255) NOT NULL
);


ALTER TABLE public.geo_position OWNER TO postgres;

--
-- Name: hibernate_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hibernate_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hibernate_sequence OWNER TO postgres;

--
-- Data for Name: appeal; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: appeal_appeal_category; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: appeal_attachments; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: appeal_category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.appeal_category (id, version, name, image_url, description) VALUES (1, 0, 'Граффити', './resources/sample_graffiti.jpg', 'Вандализм');
INSERT INTO public.appeal_category (id, version, name, image_url, description) VALUES (2, 0, 'Не убирается мусор в контейнере', './resources/sample_trashGarbage.jpg', 'Недостаток');
INSERT INTO public.appeal_category (id, version, name, image_url, description) VALUES (3, 0, 'Нелегальная мусорка', './resources/sample_trash.jpg', 'Нарушение закона');
INSERT INTO public.appeal_category (id, version, name, image_url, description) VALUES (4, 0, 'Ямы на дороге', './resources/sample_roadHole.jpg', 'ГГ');
INSERT INTO public.appeal_category (id, version, name, image_url, description) VALUES (5, 0, 'Автомобиль припоркован на тратуаре', './resources/sample_car.jpg', 'Нарушение закона');
INSERT INTO public.appeal_category (id, version, name, image_url, description) VALUES (6, 0, 'Поломана лавочка', './resources/sample_benchCrash.jpg', 'Вандализм');
INSERT INTO public.appeal_category (id, version, name, image_url, description) VALUES (7, 0, 'Грязный подъезд', './resources/sample_dirtyStaircase.jpg', 'Вандализм');
INSERT INTO public.appeal_category (id, version, name, image_url, description) VALUES (8, 0, 'Грязный лифт', './resources/sample_Dirtyelevator.jpg', 'Вандализм');


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: geo_position; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Name: hibernate_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hibernate_sequence', 8, true);


--
-- Name: appeal_category appeal_category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appeal_category
    ADD CONSTRAINT appeal_category_pkey PRIMARY KEY (id);


--
-- Name: appeal appeal_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appeal
    ADD CONSTRAINT appeal_pkey PRIMARY KEY (id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (id);


--
-- Name: geo_position geo_position_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.geo_position
    ADD CONSTRAINT geo_position_pkey PRIMARY KEY (id);


--
-- Name: appeal_appeal_category fk9ga9jentgd8qb40kcwkaq167e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appeal_appeal_category
    ADD CONSTRAINT fk9ga9jentgd8qb40kcwkaq167e FOREIGN KEY (appeal_category_id) REFERENCES public.appeal_category(id);


--
-- Name: appeal fkbgfnf1pmm7afh3xsnsq5tpnpx; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appeal
    ADD CONSTRAINT fkbgfnf1pmm7afh3xsnsq5tpnpx FOREIGN KEY (geo_position_id) REFERENCES public.geo_position(id);


--
-- Name: comments fknf3mayedfjw55ilqaki3vsg1l; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT fknf3mayedfjw55ilqaki3vsg1l FOREIGN KEY (appeal_id) REFERENCES public.appeal(id);


--
-- Name: appeal_appeal_category fktj3sq1l3tu2pwwxxsnr4v2awp; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.appeal_appeal_category
    ADD CONSTRAINT fktj3sq1l3tu2pwwxxsnr4v2awp FOREIGN KEY (appeal_categoris_id) REFERENCES public.appeal(id);


--
-- Name: DATABASE database_appeal; Type: ACL; Schema: -; Owner: postgres
--

-- GRANT ALL ON DATABASE database_appeal TO docker;


--
-- PostgreSQL database dump complete
--

