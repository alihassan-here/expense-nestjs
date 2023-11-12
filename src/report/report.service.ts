import { Injectable } from "@nestjs/common";
import { ReportType, data } from "src/data";
import { v4 as uuid } from 'uuid';
import { ResponseDto } from "src/dtos/report.dto";


interface Report { amount: number, source: string }
interface UpdateReport { amount?: number, source?: string }
@Injectable()
export class ReportService {
    getAllReports(type: ReportType): ResponseDto[] {
        return data.report.filter((report) => report.type === type).map((report) => new ResponseDto(report));
    }
    getReportById(type: ReportType, id: string): ResponseDto {
        const report = data.report
            .filter((report) => report.type === type)
            .find((report) => report.id === id);
        if (!report) return;
        return new ResponseDto(report);
    }
    createReport(type: ReportType, { amount, source }: Report): ResponseDto {
        const newReport = {
            id: uuid(),
            source,
            amount,
            created_at: new Date(),
            updated_at: new Date(),
            type,
        };
        data.report.push(newReport);
        return new ResponseDto(newReport);
    }
    updateReport(type: ReportType, id: string, body: UpdateReport): ResponseDto {
        const reportToUpdate = data.report
            .filter((report) => report.type === type)
            .find((report) => report.id === id);
        if (!reportToUpdate) return;
        const reportIndex = data.report.findIndex((report) => report.id === reportToUpdate.id);
        data.report[reportIndex] = {
            ...data.report[reportIndex],
            ...body,
            updated_at: new Date(),
        }
        return new ResponseDto(data.report[reportIndex]);

    }
    deleteReport(id: string) {
        const reportIndex = data.report.findIndex((report) => report.id === id);
        if (reportIndex !== -1) {
            return;
        }
        let resp = data.report.splice(reportIndex, 1);
        console.log(resp);
        return "deleted successfully";
    }
}
