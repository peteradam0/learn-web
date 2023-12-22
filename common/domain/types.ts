export type CreateCourseProps = {
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  videoUrl: string;
  organization: string;
};

export type CanvasAuth = {
  clientId:string
  domain:string

}

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
  videoDuration: string;
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
  createdAt: string;
  videoUrl: string;
  chapters: CreateChapterProps[];
};
