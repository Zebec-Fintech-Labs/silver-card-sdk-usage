import React, { FC, Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

type ModalSize = "small" | "medium" | "large" | "extra-large";

interface ModalProps {
  show: boolean;
  size?: ModalSize;
  className?: string;
  toggleModal: () => void;
  children: React.ReactNode;
  closeOnOutsideClick?: boolean;
  hasCloseIcon?: boolean;
  bg?: string;
}

export const Modal: FC<ModalProps> = (props) => {
  const {
    show,
    size = "large",
    className,
    toggleModal,
    children,
    bg,
    closeOnOutsideClick = false,
    hasCloseIcon = false,
  } = props;

  const sizeStyle =
    size === "extra-large"
      ? "max-w-[736px]"
      : size === "large"
        ? "max-w-[548px]"
        : size === "medium"
          ? "max-w-[420px]"
          : size === "small"
            ? "max-w-[338px]"
            : "max-w-md";

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          className="relative z-10"
          onClose={closeOnOutsideClick ? toggleModal : () => false}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-zebec-card-background-backdrop backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center relative p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className={`flex justify-center relative`}>
                  <div
                    className={twMerge(
                      `w-full transform overflow-visible relative z-[10] ${
                        bg
                          ? bg
                          : "rounded-2xl bg-zebec-card-background-secondary"
                      } px-6 pt-6 pb-10 text-left shadow-backdrop align-middle transition-all ${sizeStyle}`,
                      className
                    )}
                  >
                    {hasCloseIcon && (
                      // <button onClick={toggleModal} className="w-10 h-10 ">
                      // <CrossIcon />
                      // </button>
                      <></>
                    )}
                    {children}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
