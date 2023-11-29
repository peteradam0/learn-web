export type CreateCourseProps = {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  videoUrl: string;
};

export type CourseData = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
};

export type CreateChapterProps = {
  title: string;
  description: string;
  videoUrl: string;
};

type Topics = {
  name: string;
};

type Teacher = {};

export type Course = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  topics: Topics[];
  teacher: Teacher;
  createdAt: string;
  previewVideoUrl: string;
  chapters: CreateChapterProps[];
};
