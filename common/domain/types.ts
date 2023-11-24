export type CreateCourseProps = {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
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
