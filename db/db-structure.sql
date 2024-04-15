CREATE TABLE nutritionist (
	id INT AUTO_INCREMENT PRIMARY KEY,
	full_name VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL UNIQUE,
	user_password VARCHAR(50) NOT NULL
);

CREATE TABLE patient (
	id INT AUTO_INCREMENT PRIMARY KEY,
	full_name VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL UNIQUE,
	user_password VARCHAR(50) NOT NULL
);

ALTER TABLE patient
ADD COLUMN nutritionist_id INT,
ADD CONSTRAINT fk_nutritionist_patient FOREIGN KEY (nutritionist_id) REFERENCES nutritionist(id) ON DELETE SET NULL;

CREATE TABLE task (
	id INT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(50) NOT NULL,
	description TEXT,
	patient_id INT,
	FOREIGN KEY (patient_id) REFERENCES patient(id)
);

CREATE TABLE diet (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(30) NOT NULL,
	observations TEXT,
	patient_id INT,
	FOREIGN KEY (patient_id) REFERENCES patient(id)
);

CREATE TABLE meal (
	id INT AUTO_INCREMENT PRIMARY KEY,
	meal_type VARCHAR(20) NOT NULL,
	meal_time TIME,
	diet_id INT,
	FOREIGN KEY (diet_id) REFERENCES diet(id)
);

CREATE TABLE meal_item (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	quantity VARCHAR(30),
	meal_id INT,
	FOREIGN KEY (meal_id) REFERENCES meal(id)
);

CREATE TABLE substitution_list (
	id INT AUTO_INCREMENT PRIMARY KEY,
	observations TEXT,
	patient_id INT,
	FOREIGN KEY (patient_id) REFERENCES patient(id)
);

CREATE TABLE food_group (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(30) NOT NULL,
	substitution_list_id INT,
	FOREIGN KEY (substitution_list_id) REFERENCES substitution_list(id)
);

CREATE TABLE food_group_item (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	quantity VARCHAR(30),
	food_group_id INT,
	FOREIGN KEY (food_group_id) REFERENCES food_group(id)
);

CREATE TABLE medical_prescription (
	id INT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(100) NOT NULL,
	description TEXT,
	patient_id INT,
    FOREIGN KEY (patient_id) REFERENCES patient(id)
);

CREATE TABLE anthropometry (
	id INT AUTO_INCREMENT PRIMARY KEY,
	register_date  DATE NOT NULL,
	height VARCHAR(10) NOT NULL,
	weight VARCHAR(10) NOT NULL,
	bmi VARCHAR(10) NOT NULL,
	body_fat VARCHAR(10) NOT NULL,
	body_fat_percentage VARCHAR(10) NOT NULL,
	lean_mass VARCHAR(10) NOT NULL,
	lean_mass_percentage VARCHAR(10) NOT NULL,
	body_density VARCHAR(10) NOT NULL,
	skinfold_sum VARCHAR(10) NOT NULL,
	amb VARCHAR(10) NOT NULL,
	agb VARCHAR(10) NOT NULL,
	waist VARCHAR(10) NOT NULL,
	abdomen VARCHAR(10) NOT NULL,
	relaxed_right_arm VARCHAR(10) NOT NULL,
	contracted_right_arm VARCHAR(10) NOT NULL,
	triceps VARCHAR(10) NOT NULL,
	midaxillary VARCHAR(10) NOT NULL,
	chest VARCHAR(10) NOT NULL,
	abdominal VARCHAR(10) NOT NULL,
	suprailiac VARCHAR(10) NOT NULL,
	subscapular VARCHAR(10) NOT NULL,
	thigh VARCHAR(10) NOT NULL,
	patient_id INT,
	FOREIGN KEY (patient_id) REFERENCES patient(id)
);

CREATE TABLE agenda (
	id INT AUTO_INCREMENT PRIMARY KEY,
	register_date DATE NOT NULL,
	mood_emoji VARCHAR(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
	patient_id INT,
	FOREIGN KEY (patient_id) REFERENCES patient(id)
);

CREATE TABLE daily_task (
	id INT AUTO_INCREMENT PRIMARY KEY,
	status ENUM('DONE', 'NOT_DONE'),
	task_id INT,
	agenda_id INT,
	FOREIGN KEY (task_id) REFERENCES task(id),
	FOREIGN KEY (agenda_id) REFERENCES agenda(id)
);

CREATE TABLE meal_record (
	id INT AUTO_INCREMENT PRIMARY KEY,
	meal_type VARCHAR(20) NOT NULL,
	meal_time TIME,
	diet_id INT,
	agenda_id INT,
	FOREIGN KEY (diet_id) REFERENCES diet(id),
	FOREIGN KEY (agenda_id) REFERENCES agenda(id)
);

CREATE TABLE meal_record_item (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(50) NOT NULL,
	quantity VARCHAR(50) NOT NULL,
	meal_record_id INT,
	FOREIGN KEY (meal_record_id) REFERENCES meal_record(id)
);


CREATE TABLE daily_notes (
	id INT AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(50) NOT NULL,
	description TEXT NOT NULL,
	agenda_id INT,
	FOREIGN KEY (agenda_id) REFERENCES agenda(id)
);