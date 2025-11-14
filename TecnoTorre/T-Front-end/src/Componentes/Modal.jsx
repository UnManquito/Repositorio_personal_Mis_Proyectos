export function Modal({ children, visible, onClose, modalTipo }) {
    if (!visible) return null;

    // Ejemplo de clases condicionales
    let modalSize = "w-11/12 h-11/12 md:w-2/3 lg:w-1/2 xl:w-1/3";
    if (modalTipo === "agregarComprobante") {
        modalSize = "p-6 w-11/12 h-3/4 md:w-2/3 lg:w-2/5 xl:w-1/3";
    }
    if (modalTipo === "historial") {
        modalSize = "w-11/12 h-6/7 py-4 ";
    }

    if (modalTipo === "agregar") {
        modalSize = "w-11/12 h-10/12 md:w-10/12 lg:w-9/12 xl:w-6/12";
    }

    return (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50" onClick={onClose}>
            <div className={`bg-white flex justify-center items-center rounded-lg shadow-lg ${modalSize}`} onClick={e => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}