namespace ChakraApp.Application.Features.Scheduler.Settings;

public class SchedulerSettings
{
    public const string SectionName = "Scheduler";
    public int IntervalSeconds { get; set; } = 86400;
    public string GraceUnit { get; set; } = "Days";
}