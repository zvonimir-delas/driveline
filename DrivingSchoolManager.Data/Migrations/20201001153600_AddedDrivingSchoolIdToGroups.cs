using Microsoft.EntityFrameworkCore.Migrations;

namespace DrivingSchoolManager.Data.Migrations
{
    public partial class AddedDrivingSchoolIdToGroups : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "DrivingSchoolId",
                table: "Groups",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DrivingSchoolId",
                table: "Groups");
        }
    }
}
