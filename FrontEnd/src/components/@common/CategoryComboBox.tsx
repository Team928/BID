import { Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';
import { ICategory } from '@/types/write';

interface ICategoryProps {
  selected: ICategory;
  categoryInfo: ICategory[];
  setSelected: React.Dispatch<React.SetStateAction<ICategory>>;
}

const CategoryComboBox = ({ selected, setSelected, categoryInfo }: ICategoryProps) => {
  return (
    <div>
      <Combobox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <div className="relative w-full overflow-hidden rounded-lg bg-white text-left border ">
            <Combobox.Input
              className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 outline-none"
              readOnly
              displayValue={(category: ICategory) => category.name}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </Combobox.Button>
          </div>
          <Transition as={Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
            <Combobox.Options className="absolute mt-1 max-h-64 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black/5">
              {categoryInfo.map(item => (
                <Combobox.Option
                  key={item.id}
                  className={({ active }) =>
                    `relative select-none py-2 pl-10 pr-4 z-10 ${active ? 'bg-BID_MAIN text-white' : 'text-gray-900'}`
                  }
                  value={item}
                >
                  {({ selected, active }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>{item.name}</span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-BID_MAIN'
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default CategoryComboBox;
