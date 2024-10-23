import {Button, Container, Form} from "react-bootstrap";
import "./Reader.css"
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import {setIpAction, setPortAction} from "../reducer";

function Emulator() {
    const [readers, setReaders] = useState([]);
    const [tags, setTags] = useState([]);
    const [reader, setReader] = useState("");
    const [readerport, setReaderport] = useState("");
    const [serverip, setServerip] = useState("");
    const [serverport, setServerport] = useState("");
    const dispatch = useDispatch();

    const startEmulation = async (e) => {
        const ipport = reader + ":" + readerport;
        if (ValidateIPaddress(serverip) && ValidatePoretaddress(serverport) && ValidateIPaddressTags(reader)&&ValidatePoretaddressTags(readerport)) {
            const sender = "http://" + serverip + ":" + serverport + "/api/v1/Emulation/StartEmulation";
            await axios(sender, {
                method: 'POST',
                data: {
                    ipport
                }
            })
        }
    }

    const stopEmulation = async (e) => {
        const ipport = reader + ":" + readerport;
        if (ValidateIPaddress(serverip) && ValidatePoretaddress(serverport) && ValidateIPaddressTags(reader)&&ValidatePoretaddressTags(readerport)) {
            const sender = "http://" + serverip + ":" + serverport + "/api/v1/Emulation/StopEmulation";
            await axios(sender, {
                method: 'POST',
                data: {
                    ipport
                }
            })
        }
    }


    const fetchReader = async () => {
        if(ValidateIPaddress(serverip)&&ValidatePoretaddress(serverport)){
            const response = await axios.get("http://"+serverip+":"+serverport+"/api/v1/ReaderConfiguration/GetReaders")
            setReaders(response.data)}
    }

    const fetchTags = async () => {
        if(ValidateIPaddressTags(reader)){
            const response = await axios.get("http://"+serverip+":"+serverport+"/api/v1/DataConfiguration/GetTags")
            setTags(response.data)}
    }

    const deleteTags = async () => {
        if(ValidateIPaddressTags(reader)&&ValidatePoretaddressTags(readerport)){
            await axios.delete("http://"+serverip+":"+serverport+"/api/v1/DataConfiguration/GetTags",{
                data: {
                    connectionString: reader+readerport
            }})
    }}

    function ValidateIPaddress(ipaddress) {
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
            return (true)
        }
        alert("Введён некорректный IP сервера!")
        return (false)
    }

    function ValidatePoretaddress(portaddress) {
        if (/^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/.test(portaddress)) {
            return (true)
        }
        alert("Введён некорректный порт сервера!")
        return (false)
    }

    function ValidateIPaddressTags(ipaddress) {
        if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress)) {
            return (true)
        }
        alert("Введён некорректный IP! считывателя")
        return (false)
    }

    function ValidatePoretaddressTags(portaddress) {
        if (/^([1-9][0-9]{0,3}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/.test(portaddress)) {
            return (true)
        }
        alert("Введён некорректный порт считывателя!")
        return (false)
    }

    return(
        <div className="newReader">
            <Form>
                <Form.Group className="dataInput">
                    <label className="labelText">Введите ip и port сервера:</label>
                    <Form.Control
                        type="text"
                        className="input1"
                        placeholder='ip'
                        onChange={(e)=> {
                            setServerip(e.currentTarget.value)
                            dispatch(setIpAction(e.currentTarget.value))}}
                    />
                    <Form.Control
                        type="text"
                        className="input1"
                        placeholder='port'
                        onChange={(e)=>{
                            setServerport(e.currentTarget.value)
                            dispatch(setPortAction(e.currentTarget.value))}}
                    />
                </Form.Group>
            </Form>
            <Container className="cont">
                <Button variant="primary" className="me-2" onClick={fetchReader}>Показать считыватели</Button>
            </Container>
            <div className="readers">
                {readers &&
                    readers.map((reader, index) => {
                        return (
                            <div className="reader" key={index}>
                                <h2>{reader.ip}</h2>
                                <div className="details">
                                    <p>id: {reader.readerID}</p>
                                    <p>ip: {reader.ip} pages</p>
                                    <p>port: {reader.port}</p>
                                    <p>antennas: {reader.antennas}</p>
                                </div>
                            </div>
                        );
                    })}
            </div>
            <div className="readerInfo">
                <label className="labelText">Считыватель:</label>
                <Form className="tags">
                    <Container className="cont2">
                        <Form.Control
                            type="text"
                            className="input2"
                            placeholder='readerIp'
                            onChange={(e)=>setReader(e.currentTarget.value)}
                        />
                        <Form.Control
                            type="text"
                            className="input2"
                            placeholder='readerPort'
                            onChange={(e)=>setReaderport(e.currentTarget.value)}
                        />

                        <Button variant="primary" className="but1" onClick={fetchTags}>Показать метки</Button>
                        <Button variant="danger" className="but1" onClick={deleteTags}>Удалить считыватель</Button>
                        <Button variant="primary" className="but1" onClick={(e) => startEmulation(e)}>Начать эмуляцию</Button>
                        <Button variant="danger" className="but1" onClick={(e) => stopEmulation(e)}>Закончить эмуляцию</Button>
                    </Container>
                </Form>
            </div>
            <div className="tags">
                {tags &&
                    tags.map((tags, index) => {
                        return (
                            <div className="tags" key={index}>
                                <h2>{tags.ip}</h2>
                                <div className="details">
                                    <p>id: {tags.dataID}</p>
                                    <p>tag: {tags.tag} pages</p>
                                    <p>maxRSSI: {tags.maxRSSI}</p>
                                    <p>minRSSI: {tags.minRSSI}</p>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>

    )
}
export default Emulator;