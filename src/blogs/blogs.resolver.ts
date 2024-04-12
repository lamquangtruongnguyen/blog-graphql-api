import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { BlogsService } from './blogs.service';
import { Blog } from './entities/blog.entity';
import { CreateBlogDTO } from './dto/createBlog.dto';
import { UpdateBlogDTO } from './dto/updateBlog.dto';
import { UsePipes, ValidationPipe } from '@nestjs/common';

@Resolver((of) => Blog)
@UsePipes(new ValidationPipe({ transform: true }))
export class BlogsResolver {
  constructor(private readonly blogsService: BlogsService) {}

  @Query((returns) => [Blog])
  async getAllBlogs(): Promise<Blog[]> {
    return await this.blogsService.getAllBlogs();
  }

  @Query((returns) => Blog)
  async getBlogById(@Args('id', { type: () => ID }) id: string): Promise<Blog> {
    return await this.blogsService.getBlogById(id);
  }

  @Query((returns) => [Blog])
  async getBlogByAuthor(
    @Args('author', { nullable: true }) author: string,
  ): Promise<Blog[]> {
    return await this.blogsService.getBlogByAuthor(author);
  }

  @Mutation((returns) => Blog)
  async createBlog(@Args('createBlogDTO') createBlogDTO: CreateBlogDTO) {
    return await this.blogsService.createBlog(createBlogDTO);
  }

  @Mutation((returns) => Blog)
  async updateBlog(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateBlogDto') updateBlogDto: UpdateBlogDTO,
  ): Promise<Blog> {
    return await this.blogsService.updateBlog(id, updateBlogDto);
  }

  @Mutation((returns) => Blog)
  async removeBlog(@Args('id', { type: () => ID }) id: string): Promise<Blog> {
    return await this.blogsService.removeBlog(id);
  }
}
