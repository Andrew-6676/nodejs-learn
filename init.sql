CREATE TABLE public."user" (
	id uuid NOT NULL DEFAULT gen_random_uuid(),
	login varchar(50) NOT NULL,
	"password" varchar(255) NOT NULL,
	age numeric NOT NULL,
	isDeleted bool NOT NULL DEFAULT false,
    CONSTRAINT user_pk PRIMARY KEY (id)
);
