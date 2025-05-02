import { Link } from "react-router-dom";
import {Button} from "../components/common/button";
const Page404 = () => {
  return (
    <section className="page_404 p-4 bg-white">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 ">
            <div className="col-sm-10 col-sm-offset-1  text-center">
              <div className="four_zero_four_bg bg-image">
              </div>

              <div className="contant_box_404">
                <h3 className="h2">Look like youre lost</h3>

                <p>the page you are looking for not avaible!</p>

                <Link to={"/"}>
                  <Button className="link_404">Go to Home</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page404;
