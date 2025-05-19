import { useState } from "react";
import Perks from "./Perks";
import { Link } from "react-router-dom";

const NewPlace = () => {
  const [title, setTitle] = useState("");
  const [city, setCity] = useState("");
  const [photos, setPhotos] = useState("");
  const [description, setDescription] = useState("");
  const [extras, setExtras] = useState("");
  const [price, setPrice] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [guests, setGuests] = useState("");

  const handlerSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handlerSubmit} className="flex w-full flex-col gap-6">
      {/* TITULO */}
      <div className="flex flex-col gap-2 px-8">
        <label htmlFor="title" className="text-2xl font-bold">
          Titulo
        </label>
        <input
          type="text"
          id="title"
          placeholder="Digite o titulo do anúncio"
          className="rounded-full border border-gray-300 px-4 py-1"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* CITY */}
      <div className="flex flex-col gap-2 px-8">
        <label htmlFor="city" className="text-2xl font-bold">
          Cidade
        </label>
        <input
          type="text"
          id="city"
          placeholder="Digite a cidade do seu anúncio!"
          className="rounded-full border border-gray-300 px-4 py-1"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>

      {/* PHOTOS */}
      <div className="flex flex-col gap-2 px-8">
        <label htmlFor="photos" className="text-2xl font-bold">
          Fotos
        </label>

        <div className="flex w-full gap-2">
          <input
            type="text"
            id="photos"
            placeholder="Adicione uma foto via link"
            className="grow rounded-full border border-gray-300 px-4 py-1"
            value={photos}
            onChange={(e) => setPhotos(e.target.value)}
          />
          <button className="rounded-full border border-gray-300 bg-gray-100 px-4 py-1 transition hover:bg-gray-200">
            Enviar foto
          </button>
        </div>

        <div className="mt-2 grid grid-cols-4">
          <label
            className="flex aspect-square cursor-pointer items-center justify-center gap-2 rounded-2xl border border-gray-300 text-center hover:bg-gray-100"
            htmlFor="file"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75"
              />
            </svg>
            Upload
            <input type="file" className="hidden" id="file" />
          </label>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="flex flex-col gap-2 px-8">
        <label htmlFor="description" className="text-2xl font-bold">
          Descrição
        </label>
        <textarea
          id="description"
          placeholder="Digite a descrição do seu anúncio!"
          className="h-56 resize-none rounded-2xl border border-gray-300 px-4 py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* COMODIDADES */}
      <div className="flex flex-col gap-2 px-8">
        <label htmlFor="comodidades" className="text-2xl font-bold">
          COMODIDADES
        </label>

        <Perks />
      </div>

      {/* Infos */}
      <div className="flex flex-col gap-2 px-8">
        <label htmlFor="extras" className="text-2xl font-bold">
          Informações Adicionais
        </label>
        <textarea
          id="extras"
          placeholder="Digite a descrição do seu anúncio!"
          className="h-56 resize-none rounded-2xl border border-gray-300 px-4 py-2"
          value={extras}
          onChange={(e) => setExtras(e.target.value)}
        />
      </div>

      {/* prices */}
      <div className="flex flex-col gap-2 px-8">
        <h2 htmlFor="" className="text-2xl font-bold">
          Restrições e preços
        </h2>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(225px,1fr))] gap-2">
          {/* PRICE */}
          <div className="flex flex-col gap-2">
            <label htmlFor="price" className="ml-2 text-xl font-bold">
              Preço
            </label>
            <input
              type="number"
              id="price"
              placeholder="R$"
              value={price}
              className="rounded-full border border-gray-300 px-4 py-1"
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          {/* CHECKIN */}
          <div className="flex flex-col gap-2">
            <label htmlFor="checkin" className="ml-2 text-xl font-bold">
              Check-in
            </label>
            <input
              type="text"
              id="checkin"
              placeholder="16:00"
              className="rounded-full border border-gray-300 px-4 py-1"
              value={checkin}
              onChange={(e) => setCheckin(e.target.value)}
            />
          </div>

          {/* checkou  */}
          <div className="flex flex-col gap-2">
            <label htmlFor="checkout" className="ml-2 text-xl font-bold">
              Check-out
            </label>
            <input
              type="text"
              id="checkout"
              placeholder="18:00"
              className="rounded-full border border-gray-300 px-4 py-1"
              value={checkout}
              onChange={(e) => setCheckout(e.target.value)}
            />
          </div>

          {/* GUESTS */}
          <div className="flex flex-col gap-2">
            <label htmlFor="guests" className="ml-2 text-xl font-bold">
              N° Convidados
            </label>
            <input
              type="number"
              id="guests"
              placeholder="8"
              className="rounded-full border border-gray-300 px-4 py-1"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 px-8">
        <button className="bg-primary-400 hover:bg-primary-500 min-w-44 cursor-pointer rounded-full px-4 py-2 text-white transition">
          Salvar informações
        </button>
      </div>
    </form>
  );
};

export default NewPlace;
