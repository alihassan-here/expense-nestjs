import { IsNotEmpty, IsNumber, IsString, IsPositive, IsOptional } from "class-validator";
import { Exclude, Expose } from "class-transformer";
import { ReportType } from "src/data";

export class CreateReportDto {
    @IsNumber()
    @IsPositive()
    amount: number;

    @IsString()
    @IsNotEmpty()
    source: string;
}

export class UpdateReportDto {
    @IsOptional()
    @IsNumber()
    @IsPositive()
    amount: number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    source: string;
}

export class ResponseDto {
    id: string;
    source: string;
    amount: number;
    @Expose({ name: 'createdAt' })
    transformCreatedAt() {
        return this.created_at;
    }
    @Exclude()
    created_at: Date;
    @Exclude()
    updated_at: Date;
    type: ReportType;
    constructor(partial: Partial<ResponseDto>) {
        Object.assign(this, partial);
    }
}