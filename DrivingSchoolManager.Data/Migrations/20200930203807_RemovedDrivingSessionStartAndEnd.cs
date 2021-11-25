using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DrivingSchoolManager.Data.Migrations
{
    public partial class RemovedDrivingSessionStartAndEnd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "End",
                table: "DrivingSessions");

            migrationBuilder.DropColumn(
                name: "Start",
                table: "DrivingSessions");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "End",
                table: "DrivingSessions",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Start",
                table: "DrivingSessions",
                type: "datetime2",
                nullable: true);
        }
    }
}
