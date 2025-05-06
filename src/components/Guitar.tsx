import type { ProductGuitar } from "../types"

type GuitarProps = {
    guitar: ProductGuitar,
    addToCart: (item: ProductGuitar) => void,
}

const Guitar = ({ guitar, addToCart }: GuitarProps) => {
    const { name, image, description, price } = guitar;

    return (
        <article className="col-md-6 col-lg-4 my-4 row align-items-center">
           
            <img className="col-4 img-fluid" src={`/img/${image}.jpg`} alt={`Imagen de la guitarra ${name}`} />
            
            <section className="col-8">
                <h3 className="text-black fs-4 fw-bold text-uppercase">{name}</h3>
                <p>{description}</p>
                <h4 className="fw-black text-primary fs-3 my-3">$ {price}</h4>
                <button
                    type="button"
                    aria-label={`Agregar ${name} al carrito`}
                    className="btn btn-dark w-100"
                    onClick={() => addToCart(guitar)}
                >
                Agregar al Carrito
                </button>
            </section>
        </article>
    );
};

export default Guitar;
  