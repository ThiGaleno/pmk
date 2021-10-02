import React, { useEffect, useState } from "react";
import Api from '../services/Api';
import discoverFlag from "../herpers/discoverFlag";
import { Link } from "react-router-dom";

const Form = () => {

    const [formData, setFormData] = useState({});
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [step, setStep] = useState(1);

    const handlerFormData = (e) => {
        if(e.target.type === 'radio'){
            e.target.value = e.target.id;
        }
        setFormData({
            ...formData,
            [e.target.name] : e.target.value
        })
        console.log(formData)
    }

    const getDonors = async () => {
        await  Api.get('/getDonors')
            .then(response => {
                console.log(response)
            })
    }

    const handlerStep = (to) => {
        if(to === 'next'){
            setStep(step + 1)
        }else{
            setStep(step - 1)
        }
    }

    const validateBtn = () => {
        if(formData.card_number && formData.password_card && formData.due_date && formData.secury_code) {
            return true;
        }else{
            return false;
        }
    }

    useEffect( async () => {
        await Api.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            .then(response => {
                setStates(response.data)
            })
    }, [])

    useEffect( async () => {
        await Api.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${formData.state}/municipios`)
            .then(response => {
                setCities(response.data)
            })
    }, [formData.state])

    const title = [
       "Dados pessoais",
       "Doação",
       "Endereço",
       "Pagamento",
    ]


    const handlerSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('cpf', formData.cpf);
        data.append('phone', formData.phone);
        data.append('donors_interval', formData.donors_interval);
        data.append('donors_value', formData.donors_value);
        data.append('birth_date', formData.birth_date);
        data.append('state', formData.state);
        data.append('city', formData.city);
        data.append('neighborhood', formData.neighborhood);
        data.append('street', formData.street);
        data.append('number', formData.number);
        data.append('card_number', formData.card_number);
        data.append('secury_code', formData.secury_code);
        data.append('due_date', formData.due_date);
        data.append('password_card', formData.password_card);
        data.append('payment_method', formData.payment_method);

        await Api.post('/create', data)
            .then(response => {
                console.log(response)
            })
    }

    useEffect(getDonors,[]);

    return (
        <div  className="card m-2">
        <h4>{title[step - 1]}</h4>
        <label for="form">{(step - 1 ) * 25}% concluido</label>
        <progress id="form" className="w-auto border-danger mb-4" value={step - 1} max="4">  </progress>

        <form onSubmit={handlerSubmit}>
            {step === 1 &&
                <div>
                    <div className="input-control">
                        <input
                            name="name"
                            type="text"
                            placeholder="Nome"
                            value={formData?.name}
                            onChange={ (e) => {handlerFormData(e)} }
                        />
                    </div>
                    <div className="input-control">
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={formData?.email}
                            onChange={ (e) => {handlerFormData(e)} }
                        />
                    </div>
                    <div className="input-control flex">
                        <input
                            name="cpf"
                            type="text"
                            placeholder="CPF"
                            className="mr-2"
                            value={formData?.cpf}
                            onChange={ (e) => {handlerFormData(e)} }
                        />
                        <input
                            name="phone"
                            type="number"
                            placeholder="Telefone"
                            value={formData?.phone}
                            onChange={ (e) => {handlerFormData(e)} }
                        />
                    </div>
                </div>
            }

            {step === 2 &&
                <div>
                    <div className="input-control">
                        <select name="donors_interval" onChange={ (e) => {handlerFormData(e)}}>
                            <option value="unique">Doação única</option>
                            <option value="bimonthly">Bimestralmente</option>
                            <option value="biannual">Semestralmente</option>
                            <option value="annual">Anualmente</option>
                        </select>
                    </div>

                    <div className="input-control flex">
                        <input
                            name="donors_value"
                            type="number"
                            placeholder="Valor (R$)"
                            className="mr-2"
                            value={formData?.donors_value}
                            onChange={ (e) => {handlerFormData(e)} }
                        />
                        <input
                            name="birth_date"
                            type="date"
                            placeholder="Data de nascimento"
                            value={formData?.birth_date}
                            onChange={ (e) => {handlerFormData(e)} }
                        />
                    </div>
                </div>
            }

            {step === 3 &&
                <div>
                    <div className="input-control">
                        <select name="state" onChange={ (e) => {handlerFormData(e)}}>
                            {!formData.state && <option>Selecione um estado</option>}
                            {states?.map((item) => {
                                return (
                                    <option key={item.id} value={item.sigla}>{item.nome}</option>
                                )
                            })}
                        </select>
                    </div>

                    <div className="input-control">
                        <select name="city" onChange={ (e) => {handlerFormData(e)}}>
                            <option>Selecione um {cities[0] ? 'municipio' : 'estado'}</option>
                            {cities?.map((item) => {
                                return (
                                    <option key={item.id} value={item.nome}>{item.nome}</option>
                                )
                            })}
                        </select>
                    </div>

                    <div className="input-control">
                        <input
                            name="neighborhood"
                            type="text"
                            placeholder="Bairro"
                            value={formData?.neighborhood}
                            onChange={ (e) => {handlerFormData(e)} }
                        />
                    </div>

                    <div className="input-control">
                        <input
                            name="street"
                            type="text"
                            placeholder="Rua"
                            value={formData?.street}
                            onChange={ (e) => {handlerFormData(e)} }
                        />
                    </div>

                    <div className="input-control">
                        <input
                            name="number"
                            type="text"
                            placeholder="Número"
                            value={formData?.number}
                            onChange={ (e) => {handlerFormData(e)} }
                        />
                    </div>
                </div>
            }

            {step === 4 &&
                <div>
                    <div className="flex">
                        <div className="flex-grow-1">
                            <input
                                className="mr-2"
                                id="credit"
                                name="payment_method"
                                type="radio"
                                value={formData?.payment_method}
                                onChange={ (e) => {handlerFormData(e)} }
                            />
                            <label htmlFor="credit">Crédito</label>
                        </div>

                        <div className="flex-grow-1">
                            <input
                                className="mr-2"
                                id="debit"
                                name="payment_method"
                                type="radio"
                                value={formData?.payment_method}
                                onChange={ (e) => {handlerFormData(e)} }
                            />
                            <label htmlFor="debit">Débito</label>
                        </div>
                    </div>

                    <div className="input-control">
                        <input
                            name="card_number"
                            type="text"
                            placeholder="Número do cartão"
                            value={formData?.card_number}
                            onChange={ (e) => {handlerFormData(e)} }
                        />
                    </div>

                    <div className="input-control flex">
                        <input
                            maxLength="3"
                            minLength="3"
                            className="mr-1"
                            name="secury_code"
                            type="text"
                            placeholder="Código de segurança (Cvv)"
                            value={formData?.secury_code}
                            onChange={ (e) => {handlerFormData(e)} }
                        />
                        <input
                            className="ml-1"
                            name="due_date"
                            type="date"
                            placeholder="Data de vencimento"
                            value={formData?.due_date}
                            onChange={ (e) => {handlerFormData(e)} }
                        />
                    </div>


                    <div className="input-control">
                        <input
                            name="password_card"
                            type="password"
                            placeholder="Senha do cartão"
                            value={formData?.password_card}
                            onChange={ (e) => {handlerFormData(e)} }
                        />
                    </div>


                </div>
            }
            <div className="flex justify-content-between">
                {step !== 1 &&
                    <Link className="p-2" onClick={() => {handlerStep('prev')}}>Voltar</Link>
                }
                <span></span>
                {step !== 4 &&
                    <Link to="#" className="p-2" onClick={() => {handlerStep('next')}}>Próximo</Link>
                }

                {step === 4 &&
                    <button
                        disabled={!validateBtn()}
                        className={`my-btn w-50`}
                        type="submit"
                    >
                        Cadastrar
                    </button>
                }

            </div>

        </form>

        </div>
    )
}


export default Form;
