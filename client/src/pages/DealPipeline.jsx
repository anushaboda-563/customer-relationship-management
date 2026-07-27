import { useEffect, useState } from "react";
import { getDeals } from "../services/dealService";
import "../styles/DealPipeline.css";
import Layout from "../components/Layout";

function DealPipeline() {
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    loadDeals();
  }, []);

  const loadDeals = async () => {
    try {
      const data = await getDeals();
      setDeals(data);
    } catch (error) {
      console.log(error);
    }
  };

  const proposalDeals = deals.filter(
    (deal) => deal.stage === "Proposal"
  );

  const negotiationDeals = deals.filter(
    (deal) => deal.stage === "Negotiation"
  );

  const wonDeals = deals.filter(
    (deal) => deal.stage === "Won"
  );

  const lostDeals = deals.filter(
    (deal) => deal.stage === "Lost"
  );

  const renderDeals = (dealList) =>
    dealList.map((deal) => (
      <div className="pipeline-card" key={deal._id}>
        <h5>{deal.lead?.name}</h5>

        <p>
          <strong>Value:</strong> ₹{deal.value}
        </p>

        <p>
          <strong>Close:</strong>{" "}
          {new Date(deal.closeDate).toLocaleDateString()}
        </p>
      </div>
    ));

    return (
    <Layout>

        <div className="container-fluid mt-4">

            <h2 className="text-center mb-4">
                Deal Pipeline
            </h2>

            <div className="pipeline-container">

                <div className="pipeline-column proposal">

                    <h4>Proposal</h4>

                    {renderDeals(proposalDeals)}

                </div>

                <div className="pipeline-column negotiation">

                    <h4>Negotiation</h4>

                    {renderDeals(negotiationDeals)}

                </div>

                <div className="pipeline-column won">

                    <h4>Won</h4>

                    {renderDeals(wonDeals)}

                </div>

                <div className="pipeline-column lost">

                    <h4>Lost</h4>

                    {renderDeals(lostDeals)}

                </div>

            </div>

        </div>

    </Layout>
);
}

export default DealPipeline;