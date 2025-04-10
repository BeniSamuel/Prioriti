import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TaskDto } from "src/dto/taskDto.dto";
import { Task } from "src/entities/task.entity";
import { Tpriority } from "src/enum/EPRIORITY";
import { Tstatus } from "src/enum/ESTATUS";
import { Repository } from "typeorm";

@Injectable()
export class TaskService {
    constructor (
        @InjectRepository(Task) private readonly taskRepository: Repository<Task> 
    ) {}

    createTask (taskDto: TaskDto): Promise<Task> {
        const newTask = this.taskRepository.create(taskDto);
        newTask.due_date = new Date();
        newTask.priority = Tpriority.LOW;
        newTask.status = Tstatus.TODO;
        return this.taskRepository.save(newTask);
    }

    getAllTask (): Promise<Task[]> {
        return this.taskRepository.find();
    }

    getTask (id: number): Promise<Task> {
        return this.taskRepository.findOne({ where: {id} });
    }

    async updateTask (id: number, taskDto: TaskDto): Promise<Task> { 
        const task = await this.taskRepository.findOne({ where: {id} });
        task.description = taskDto.description;
        task.title = taskDto.title;
        return this.taskRepository.save(task);
    }

    async deleteTask (id: number): Promise<String> {
        const task = await this.taskRepository.findOne({ where: {id} });
        if (!task) { throw new NotFoundException("Task Not Found!!"); }

        this.taskRepository.delete(task);
        return "deleted";
    }
}