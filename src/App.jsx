import { useState } from 'react'
import './App.css'
import { useRef } from 'react'
import html2canvas from 'html2canvas'

function App() {

  const [lineas, setLineas] = useState([])
  const [detalle, setDetalle] = useState('')
  const [precioUnit, setPrecioUnit] = useState('')
  const [cantidad, setCantidad] = useState('')
  const [destinatario, setDestinatario] = useState('')
  const [estaGenerando, setEstaGenerando] = useState(false)
  const presupuestoRef = useRef(null)

  const agregarLinea = () => {
    if (detalle && precioUnit) {
      setLineas([...lineas, { detalle, precioUnit: parseFloat(precioUnit), cantidad: parseFloat(cantidad), subtotal: precioUnit * cantidad }])
      setDetalle('')
      setPrecioUnit('')
    }
  }

  const generarImagen = async () => {
    if (presupuestoRef.current) {
      const canvas = await html2canvas(presupuestoRef.current);
      const imagen = canvas.toDataURL(); // Genera la imagen
      const link = document.createElement('a');
      link.href = imagen;
      link.download = `presupuesto${fecha}.png`;
      link.click();
    }
  }

  const total = lineas.reduce((sum, linea) => sum + linea.subtotal, 0)

  const fecha = new Date().toLocaleDateString('es', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  })

  return (
    <>
      <div className="container mx-auto p-4 max-w-3xl flex flex-col">
        <h1 className='text-3xl font-bold mb-6 text-center text-primary font-titulo'>Generador de Presupuesto</h1>
        <p className="text-base text-center mb-8">Crea tu presupuesto y genera una imagen fácilmente</p>

        <div className="bg-white shadow-md rounded-lg p-6 mb-4">
          <h2 className="text-xl font-semibold mb-2">Agregar Línea de Presupuesto</h2>
          <p className="text-gray-600 text-sm mb-4">Ingresa los detalles de cada ítem de tu presupuesto</p>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <label htmlFor="detalle" className="w-1/4 text-right">
                Para:
              </label>
              <input
                id="detalle"
                type="text"
                value={destinatario}
                onChange={(e) => setDestinatario(e.target.value)}
                className="w-3/4 p-2 border rounded-md"
                placeholder="Ej: Nazcar"
              />
            </div>
            <hr />
            <div className="flex items-center space-x-4">
              <label htmlFor="detalle" className="w-1/4 text-right">
                Detalle
              </label>
              <input
                id="detalle"
                type="text"
                value={detalle}
                onChange={(e) => setDetalle(e.target.value)}
                className="w-3/4 p-2 border rounded-md"
                placeholder="Ej: Bolsa 40x50 Oferta"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label htmlFor="precioUnit" className="w-1/4 text-right">
                Precio Unitario
              </label>
              <span className="pl-2 pr-0 font-semibold text-lg">
                $
              </span>
              <input
                id="precioUnit"
                type="number"
                value={precioUnit}
                onChange={(e) => setPrecioUnit(e.target.value)}
                className="w-3/4 p-2 border rounded-md !ml-1"
                placeholder="Ej: 100.00"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label htmlFor="precioUnit" className="w-1/4 text-right">
                Cantidad
              </label>
              <span className="pl-2 pr-0 font-semibold text-lg">
                $
              </span>
              <input
                id="cantidad"
                type="number"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                className="w-3/4 p-2 border rounded-md !ml-1"
                placeholder="Ej: 1"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label htmlFor="precioUnit" className="w-1/4 text-right">
                Subtotal
              </label>
              <span className="pl-2 pr-0 font-semibold text-lg">
                $
              </span>
              <input
                id="subtotal"
                type="number"
                value={precioUnit * cantidad}
                readOnly
                className="w-3/4 p-2 rounded-md !ml-1"
              />
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={agregarLinea}
              className="bg-secondary text-texto px-10 py-2 rounded-md hover:border-texto hover:bg-primary hover:text-black transition-all"
            >
              Agregar Línea
            </button>
          </div>
        </div>

        <button
          onClick={generarImagen}
          className="bg-primary text-lg text-back px-8 py-2 rounded-md hover:bg-accent hover:text-texto transition-colors mb-4 mx-auto"
        >
          Descargar Imagen
        </button>

        <div className='overflow-x-auto'>
          <div
            ref={presupuestoRef}
            className={`bg-white p-8 font-mono text-sm`}
            style={{
              width: '210mm',
              margin: '0 auto'
            }}
          >
            <div className="border-2 border-gray-800 p-4">
              <div className="text-center mb-4">
                <img src="/interplast-high-resolution-logo-transparent.png" alt="Logo" className="w-44 mb-6 mx-auto" />
                <div className="text-xs mb-1 font-semibold">DOCUMENTO NO</div>
                <div className="text-xs mb-2 font-semibold">VALIDO COMO FACTURA</div>
                <div className="flex justify-between mb-4">
                  <div className="font-bold text-lg">PRESUPUESTO</div>
                  <div className="border border-gray-800 px-2 font-bold pb-4 pt-1 rounded-md">{fecha}</div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center">
                  <div className="w-20">Señor/es:</div>
                  <div className="flex-1 border-b border-gray-400 font-bold pl-3 pb-2 text-base">{destinatario}</div>
                </div>
              </div>

              <table className="w-full mb-4">
                <thead>
                  <tr className="border-b-2 border-gray-800 h-8">
                    <th className={`text-left w-20'`}>Cant.</th>
                    <th className="text-left">Descripción</th>
                    <th className={`text-right w-32`}>Precio Unit.</th>
                    <th className={`text-right w-32`}>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {lineas.map((linea, index) => (
                    <tr key={index} className="border-b border-secondary/80">
                      <td className="pb-3 pt-1">{linea.cantidad}</td>
                      <td className='pb-3 pt-1'>{linea.detalle}</td>
                      <td className="pb-3 pt-1 text-right">${linea.precioUnit.toFixed(2)}</td>
                      <td className="pb-3 pt-1 text-right">${linea.subtotal.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-between items-center">
                <div className="text-sm">Muchas Gracias por su Compra</div>
                <div className="border-2 rounded-md border-gray-800 px-4 pb-4 pt-1">
                  <div className="font-bold">TOTAL: ${total.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
