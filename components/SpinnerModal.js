import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Spinner from './Spinner'

export default function SpinnerModal({ shouldOpen }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    setIsOpen(shouldOpen)
  }, [shouldOpen])

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={isOpen}
        onClose={() => {}}
      >
        <div className="container min-h-screen block text-center p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into vertically centering the modal contents. */}
          <span
            className="inline-block align-middle h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block bg-transparent text-center overflow-hidden transform transition-all my-8 align-middle max-w-sm w-full p-6">
              <div className="mx-auto flex items-center justify-center h-12 w-12">
                <Spinner isWhite />
              </div>
              {/* hack to prevent "focus trap" error */}
              <button type="button" className="opacity-0 absolute bottom-0" />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
