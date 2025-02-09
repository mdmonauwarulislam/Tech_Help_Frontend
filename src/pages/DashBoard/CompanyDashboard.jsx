import JobDashboardCard from "../../components/Job/JobDashboardCard"
const CompanyDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto min-h-screen py-20">
        <div className="grid grid-cols-3 gap-4">
            <JobDashboardCard/>
            <JobDashboardCard/>
            <JobDashboardCard/>
            <JobDashboardCard/>
            <JobDashboardCard/>
        </div>
    </div>
  )
}

export default CompanyDashboard