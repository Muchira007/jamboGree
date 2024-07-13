import Single from '../../components/single/Single';
import { singleProduct } from '../../data';
import './product.scss';
const Product = () => {
  return (
    <div>
      <Single {...singleProduct} />
    </div>
  );
};

export default Product;
