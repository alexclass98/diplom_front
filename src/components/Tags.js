import {Button, Form} from "react-bootstrap";
import "./Reader.css"
import {useState} from "react";
import axios from "axios";
import {useSelector} from "react-redux";
import {selectIp, selectPort} from "../reducer";

function Tags() {
    const [epc, setEpc] = useState("");
    const [maxRSSI, setMaxRSSI] = useState("");
    const [minRSSI, setMinRSSI] = useState("");
    const [maxCount, setMaxCount] = useState("");
    const [minCount, setMinCount] = useState("");
    const [readerID, setReaderID] = useState("");

    const serverip = useSelector(selectIp);
    const serverport = useSelector(selectPort);

    const postTags = async (e) => {
        const formData = new FormData()
        formData.append('epc', epc)
        formData.append('maxRSSI', maxRSSI)
        formData.append('minRSSI', minRSSI)
        formData.append('maxCount', maxCount)
        formData.append('minCount', minCount)
        formData.append('readerID', readerID)
        e.preventDefault();

        const sender = "http://"+serverip+":"+serverport+"/api/v1/DataConfiguration/CreateTag";

        await axios(sender, {
            method: 'POST',
            data: formData,
        })
    }

    return(
      <div className="newReader">
          <div className="headerReader">
              <h1>Создание метки</h1>
          </div>
          <div className="body">
              <Form className="formReader">
                  <Form.Group className="form-body">
                      <label className="labelText">Введите метку:</label>
                      <Form.Control
                          type="text"
                          className="input"
                          placeholder='Введите необходимые EPC через Enter'
                          onChange={(e)=> setEpc(e.currentTarget.value)}
                      />
                      <label className="labelText">Введите свойства:</label>
                      <Form.Control
                          type="text"
                          className="input"
                          placeholder='maxRSSI'
                          onChange={(e)=> setMaxRSSI(e.currentTarget.value)}
                      />
                      <Form.Control
                          type="text"
                          className="input"
                          placeholder="minRSSI"
                          onChange={(e)=> setMinRSSI(e.currentTarget.value)}
                      />
                      <Form.Control
                          type="text"
                          className="input"
                          placeholder="maxCount"
                          onChange={(e)=> setMaxCount(e.currentTarget.value)}
                      />
                      <Form.Control
                          type="text"
                          className="input"
                          placeholder="minCount"
                          onChange={(e)=> setMinCount(e.currentTarget.value)}
                      />
                      <Form.Control
                          type="text"
                          className="input"
                          placeholder="readerID"
                          onChange={(e)=> setReaderID(e.currentTarget.value)}
                      />
                      <Button className="but" variant="primary" onClick={(e) => postTags(e)}>Готово</Button>
                  </Form.Group>
              </Form>
          </div>
      </div>
    )
}
export default Tags;