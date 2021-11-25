using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace DrivingSchoolManager.Data.Migrations
{
    public partial class AddedLocationLogs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DrivingSessions_Path");

            migrationBuilder.DropColumn(
                name: "Coordinates_Latitude",
                table: "DrivingSessions");

            migrationBuilder.DropColumn(
                name: "Coordinates_Longitude",
                table: "DrivingSessions");

            migrationBuilder.DropColumn(
                name: "Coordinates_Latitude",
                table: "DrivingSchools");

            migrationBuilder.DropColumn(
                name: "Coordinates_Longitude",
                table: "DrivingSchools");

            migrationBuilder.AddColumn<float>(
                name: "XCoordinate",
                table: "DrivingSessions",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "YCoordinate",
                table: "DrivingSessions",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "XCoordinate",
                table: "DrivingSchools",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<float>(
                name: "YCoordinate",
                table: "DrivingSchools",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.CreateTable(
                name: "DrivingSessionLocationLogs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    XCoordinate = table.Column<float>(nullable: false),
                    YCoordinate = table.Column<float>(nullable: false),
                    Timestamp = table.Column<DateTime>(nullable: false),
                    DrivingSessionId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DrivingSessionLocationLogs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_DrivingSessionLocationLogs_DrivingSessions_DrivingSessionId",
                        column: x => x.DrivingSessionId,
                        principalTable: "DrivingSessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_DrivingSessionLocationLogs_DrivingSessionId",
                table: "DrivingSessionLocationLogs",
                column: "DrivingSessionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "DrivingSessionLocationLogs");

            migrationBuilder.DropColumn(
                name: "XCoordinate",
                table: "DrivingSessions");

            migrationBuilder.DropColumn(
                name: "YCoordinate",
                table: "DrivingSessions");

            migrationBuilder.DropColumn(
                name: "XCoordinate",
                table: "DrivingSchools");

            migrationBuilder.DropColumn(
                name: "YCoordinate",
                table: "DrivingSchools");

            migrationBuilder.AddColumn<float>(
                name: "Coordinates_Latitude",
                table: "DrivingSessions",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Coordinates_Longitude",
                table: "DrivingSessions",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Coordinates_Latitude",
                table: "DrivingSchools",
                type: "real",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Coordinates_Longitude",
                table: "DrivingSchools",
                type: "real",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "DrivingSessions_Path",
                columns: table => new
                {
                    DrivingSessionId = table.Column<int>(type: "int", nullable: false),
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Latitude = table.Column<float>(type: "real", nullable: false),
                    Longitude = table.Column<float>(type: "real", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DrivingSessions_Path", x => new { x.DrivingSessionId, x.Id });
                    table.ForeignKey(
                        name: "FK_DrivingSessions_Path_DrivingSessions_DrivingSessionId",
                        column: x => x.DrivingSessionId,
                        principalTable: "DrivingSessions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }
    }
}
