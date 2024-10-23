import {Button, Form} from "react-bootstrap";
import "./Reader.css"
import {useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import {selectIp, selectPort} from "../reducer";

function Reader() {
    const [ip, setIp] = useState("");
    const [port, setPort] = useState("");
    const [antennas, setAntennas] = useState("");
    const [priority, setPriority] = useState("");
    const [readTime, setReadTime] = useState("");
    const [repeatTime, setRepeatTime] = useState("");
    const [timeOut, setTimeOut] = useState("");
    const [maxTags, setMaxTags] = useState("");

    const serverip = useSelector(selectIp);
    const serverport = useSelector(selectPort);

    const postReader = async (e) => {
        const formData = new FormData()
        formData.append('ip', ip)
        formData.append('port', port)
        formData.append('antennas', antennas)
        formData.append('priority', priority)
        formData.append('readTime', readTime)
        formData.append('repeatTime', repeatTime)
        formData.append('timeOut', timeOut)
        formData.append('maxTags', maxTags)
        e.preventDefault();
        const sender = "http://"+serverip+":"+serverport+"/api/v1/ReaderConfiguration/CreateReader";

        await axios(sender, {
            method: 'POST',
            data: formData,
        })
        setIp("");
        setPort("");
        setAntennas("");
        setPriority("");
        setReadTime("")
        setRepeatTime("");
        setTimeOut("");
        setMaxTags("");
    }
    return(
        <div className="newReader">
            <div className="headerReader">
                <h1>Создание считывателя</h1>
            </div>
            <div className="body">
                <Form className="formReader">
                    <Form.Group className="form-body">
                        <label className="labelText">Введите конфигурацию считывателя:</label>
                        <Form.Control
                            defaultValue={ip}
                            type="text"
                            className="input"
                            placeholder='ip'
                            onChange={(e)=> setIp(e.currentTarget.value)}
                        />
                        <Form.Control
                            defaultValue={port}
                            type="text"
                            className="input"
                            placeholder='port'
                            onChange={(e)=> setPort(e.currentTarget.value)}
                        />
                        <Form.Control
                            defaultValue={antennas}
                            type="text"
                            className="input"
                            placeholder="antennas"
                            onChange={(e)=> setAntennas(e.currentTarget.value)}
                        />
                        <Form.Control
                            defaultValue={priority}
                            type="text"
                            className="input"
                            placeholder="priority"
                            onChange={(e)=> setPriority(e.currentTarget.value)}
                        />
                        <Form.Control
                            defaultValue={readTime}
                            type="text"
                            className="input"
                            placeholder="readTime"
                            onChange={(e)=> setReadTime(e.currentTarget.value)}
                        />
                        <Form.Control
                            defaultValue={repeatTime}
                            type="text"
                            className="input"
                            placeholder="repeatTime"
                            onChange={(e)=> setRepeatTime(e.currentTarget.value)}
                        />
                        <Form.Control
                            defaultValue={timeOut}
                            type="text"
                            className="input"
                            placeholder="timeOut"
                            onChange={(e)=> setTimeOut(e.currentTarget.value)}
                        />
                        <Form.Control
                            defaultValue={maxTags}
                            type="text"
                            className="input"
                            placeholder="maxTags"
                            onChange={(e)=> setMaxTags(e.currentTarget.value)}
                        />
                        <Button className="but" variant="primary" onClick={(e) => postReader(e)}>Готово</Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    )
}
export default Reader;