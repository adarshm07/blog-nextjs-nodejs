import AuthWrapper from "@/components/AuthWrapper";
import { Count } from "@/components/Count";
import Layout from "@/components/Layout";

function Dashboard() {
  return (
    <div>
      <Layout>
        <div className="mt-2">
          <div className="page-title">
            <h4>Dashboard</h4>
          </div>
          <Count />
        </div>
      </Layout>
    </div>
  );
}

export default AuthWrapper(Dashboard);
