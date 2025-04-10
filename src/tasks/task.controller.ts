import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TaskService } from "./task.service";
import { ResponseEntity } from "src/utils/response.utils";
import { Task } from "src/entities/task.entity";
import { TaskDto } from "src/dto/taskDto.dto";

@Controller("/api/v1/nest/task")
export class TaskController {
    constructor (
        private readonly taskService: TaskService
    ) {}

    @Post()
    async createTask (@Body() taskDto: TaskDto): Promise<ResponseEntity<Task>> {
        return new ResponseEntity(true, "Task Created!", await this.taskService.createTask(taskDto));
    }

    @Get()
    async getAllTask (): Promise<ResponseEntity<Task[]>> {
        return new ResponseEntity(true, "Tasks", await this.taskService.getAllTask());
    }

    @Get("/:id")
    async getTask (@Param("id") id: string): Promise<ResponseEntity<Task>> {
        return new ResponseEntity(true, "Task", await this.taskService.getTask(parseInt(id)));
    }

    @Put("/:id")
    async updateTask (@Body() taskDto: TaskDto, @Param("id") id: string): Promise<ResponseEntity<Task>> {
        return new ResponseEntity(true, "Updated Task", await this.taskService.updateTask(parseInt(id), taskDto));
    }

    @Delete("/:id")
    async deleteTask (@Param("id") id: string): Promise<ResponseEntity<String>> {
        return new ResponseEntity(true, "Deleted Task", await this.taskService.deleteTask(parseInt(id)));
    }
}