import { useGetProductsQuery } from "../slices/productsApiSlice.js";
import Product from "../components/Product";
import { useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({ pageNumber });
  const navigate = useNavigate();
  const handlePageClick = (obj) => {
    navigate("/products/" + Number(obj.selected + 1));
  };

  return (
    <div>
      {isLoading ? (
        <div>loading</div>
      ) : (
        <div className="mx-auto px-4 pt-8">
          <h1 className="text-3xl font-bold text-black pb-8">All Products</h1>
          <div className="bg-white grid grid-cols-4 grid-rows-2 gap-y-6">
            {data.products.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
          <div className="flex justify-center">
            <ReactPaginate
              className="flex text-xl space-x-3 bg-secondary rounded rounded-full px-4 py-1 mt-8"
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              pageCount={data.pages}
              previousLabel="<"
              containerClassName="flex items-center justify-center"
              pageClassName="w-8 h-8 block flex items-center justify-center rounded rounded-full"
              activeClassName="bg-primary"
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
