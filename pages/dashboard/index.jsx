import AuthWrapper from "@/components/AuthWrapper";
import Layout from "@/components/Layout";

function Dashboard() {
  return (
    <div>
      <Layout>
        <div className="mt-2">
          <div className="page-title">
            <h4>Dashboard</h4>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default AuthWrapper(Dashboard);
