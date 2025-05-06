import { useState } from "react"
import type { CartItem, GuitarID } from "../types"

type HeaderProps = {
    cart: CartItem[],
    removeFromCart: (id: GuitarID) => void,
    changeQuantity: (id: GuitarID, up: boolean) => void,
    clearCart: () => void,
    isEmpty: boolean,
    cartTotal: number,
    totalItems: number,
}

const Header = ({
  cart,
  removeFromCart,
  changeQuantity,
  clearCart,
  isEmpty,
  cartTotal,
  totalItems,
}: HeaderProps) => {
  const [showCart, setShowCart] = useState(false)

  return (
    <header className="py-5 header">
      <div className="container-xl">
        <div className="row justify-content-center justify-content-md-between">
          <div className="col-8 col-md-3">
            <a href="/">
              <img className="img-fluid" src="/img/logo.svg" alt="imagen logo" />
            </a>
          </div>

          <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
            <div className="carrito" style={{ position: "relative" }}>
              <button
                className="btn p-0 border-0 bg-transparent"
                onClick={() => setShowCart(prev => !prev)}
                aria-label="Mostrar carrito"
              >
                <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />
                {totalItems > 0 && (
                  <span className="cart-badge btn btn-danger">{totalItems > 9 ? '9+' : totalItems}</span>
                )}
              </button>

              {showCart && (
                <div
                  id="carrito"
                  className="bg-white p-3 shadow"
                  role="dialog"
                  aria-modal="true"
                  style={{
                    position: "absolute",
                    top: "100%",
                    right: 0,
                    zIndex: 10,
                    width: "400px",
                    maxWidth: "90vw",
                  }}
                >
                  {isEmpty ? (
                    <p className="text-center">El carrito está vacío</p>
                  ) : (
                    <>
                      <table className="w-100 table">
                        <thead>
                          <tr>
                            <th>Imagen</th>
                            <th>Nombre</th>
                            <th>Precio</th>
                            <th>Cantidad</th>
                            <th>
                                <span className="visually-hidden">Eliminar</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {cart.map(guitar => (
                            <tr key={guitar.id}>
                              <td>
                                <img
                                  className="img-fluid"
                                  src={`/img/${guitar.image}.jpg`}
                                  alt={`Imagen de ${guitar.name}`}
                                />
                              </td>
                              <td>{guitar.name}</td>
                              <td className="fw-bold">${guitar.price}</td>
                              <td className="flex align-items-start gap-4">
                                <button
                                  type="button"
                                  className="btn btn-dark"
                                  onClick={() => changeQuantity(guitar.id, false)}
                                >
                                  -
                                </button>
                                {guitar.quantity}
                                <button
                                  type="button"
                                  className="btn btn-dark"
                                  onClick={() => changeQuantity(guitar.id, true)}
                                >
                                  +
                                </button>
                              </td>
                              <td>
                                <button
                                  className="btn btn-danger"
                                  type="button"
                                  onClick={() => removeFromCart(guitar.id)}
                                >
                                  X
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <p className="text-end">
                        Total a pagar: <span className="fw-bold">${cartTotal}</span>
                      </p>
                    </>
                  )}
                  <button
                    className="btn btn-dark w-100 mt-3 p-2"
                    onClick={clearCart}
                  >
                    Vaciar Carrito
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
