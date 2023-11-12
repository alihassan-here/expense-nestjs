import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    ParseUUIDPipe,
    ParseEnumPipe,
} from '@nestjs/common';
import { data, ReportType } from 'src/data';
import { ReportService } from './report.service';
import { CreateReportDto, UpdateReportDto, ResponseDto } from 'src/dtos/report.dto';

@Controller('report/:type')
export class ReportController {
    constructor(private readonly reportService: ReportService) { }
    @Get()
    getAllReports(@Param('type') type: string): ResponseDto[] {
        const reportType =
            type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
        return this.reportService.getAllReports(reportType);
    }
    @Get(':id')
    getReportById(@Param('type', new ParseEnumPipe(ReportType)) type: string, @Param('id', ParseUUIDPipe) id: string): ResponseDto {
        const reportType =
            type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
        return this.reportService.getReportById(reportType, id);
    }
    @Post()
    createReport(
        @Body()
        {
            amount,
            source,
        }: CreateReportDto,
        @Param('type', new ParseEnumPipe(ReportType))
        type: string,
    ): ResponseDto {
        const reportType =
            type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
        return this.reportService.createReport(reportType, { amount, source })
    }
    @Put(':id')
    updateReport(
        @Param('type', new ParseEnumPipe(ReportType)) type: string, @Param('id', ParseUUIDPipe) id: string, @Body()
        body: UpdateReportDto): ResponseDto {
        const reportType =
            type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
        return this.reportService.updateReport(reportType, id, body);
    }
    @Delete(':id')
    deleteReport(@Param('id', ParseUUIDPipe) id: string) {
        return this.reportService.deleteReport(id);
    }
}
