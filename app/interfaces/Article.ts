export interface ArticleType {
  author: string;
  body?: string;
  title: string;
  article_id: number;
  topic: string;
  created_at: string;
  votes: number;
  article_img_url: string;
  comment_count: number;
}
