import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Blog } from './entities/blog.entity';
import { Repository } from 'typeorm';
import { CreateBlogDTO } from './dto/createBlog.dto';
import { UpdateBlogDTO } from './dto/updateBlog.dto';

@Injectable()
export class BlogsService {
  constructor(
    @InjectRepository(Blog) private blogsRepository: Repository<Blog>,
  ) {}

  async getAllBlogs(): Promise<Blog[]> {
    return await this.blogsRepository.find();
  }

  async getBlogById(id: string): Promise<Blog> {
    const blog = await this.blogsRepository.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return blog;
  }

  async getBlogByAuthor(author?: string): Promise<Blog[]> {
    if (!author || author.trim() === '') author = 'Unknown';
    const blog = await this.blogsRepository.find({ where: { author } });
    if (blog.length === 0) {
      throw new NotFoundException(
        `Not found any blog whose author is ${author}`,
      );
    }
    return blog;
  }

  async createBlog(createBlogDto: CreateBlogDTO): Promise<Blog> {
    if (createBlogDto.author === '') {
      createBlogDto.author = 'Unknown';
    }
    if (createBlogDto.email === '') {
      createBlogDto.email = null;
    }
    const blog = this.blogsRepository.create(createBlogDto);
    return await this.blogsRepository.save(blog);
  }

  async updateBlog(id: string, updateBlogDto: UpdateBlogDTO): Promise<Blog> {
    await this.getBlogById(id);
    if (updateBlogDto.author === '') {
      updateBlogDto.author = 'Unknown';
    }
    await this.blogsRepository.save({
      id,
      ...updateBlogDto,
    });
    return await this.getBlogById(id);
  }

  async removeBlog(id: string): Promise<Blog> {
    const blogTodelete = await this.getBlogById(id);
    await this.blogsRepository.delete({ id });
    return blogTodelete;
  }
}
