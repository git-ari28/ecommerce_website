

import React from 'react';
import Layout from '../../components/Layouts/Layout';
import UserMenu from '../../components/Layouts/UserMenu';

const Orders = () => {
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h2>Your Orders</h2>
              {/* Order details content here */}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
