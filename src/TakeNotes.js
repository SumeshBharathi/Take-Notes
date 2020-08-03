import React from 'react'
import { useState, useRef, useEffect } from 'react'
import ListView from './component/ListView'
import './App.css'
import moment from 'moment'

export default function TakeNotes() {

    var [headingVal, setHeadingVal] = useState('PeopleBox\'s Take Notes');
    var [select, setselect] = useState('-1');
    const [list, setList] = useState([]);
    const [tempList, setTempList] = useState([]);
    const STORAGE_KEY = "PeopleBOx.ai";
    const AddTextField = useRef();
    var ContentTextField = useRef();
    var SearchTextField = useRef();
    // localStorage.setItem(STORAGE_KEY,null);

    useEffect(() => {
        const storage = JSON.parse(localStorage.getItem(STORAGE_KEY));
        if (storage) {
            setList(storage)
        }
        if (storage) {
            setTempList(storage)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    }, [list])


    function add() {
        if (AddTextField.current.value === "") {
            alert('Your input is empty!')
        }
        else {
            const val = AddTextField.current.value
            setList(newlist => {
                return [...newlist, { 'name': val, 'content': 'Your new text goes here!', 'created': (moment()).toString(), 'updated': new Date() }];
            })
            setTempList(newlist => {
                return [...list, { 'name': val, 'content': 'Your new text goes here!', 'created': (moment()).toString(), 'updated': new Date() }];
            })

            AddTextField.current.value = '';
        }
    }

    function call(index) {
        if (list[index] !== "") {
            ContentTextField.current.value = tempList[index].content;
            setHeadingVal(() => {
                return tempList[index].name;
            })
        }
        else {
            ContentTextField.current.value = "";
        }
        setselect(() => {
            return index;
        })


    }

    function delfunc(index) {
        let temp = list.splice(index, 1);
        setList(() => {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
            return list;
        })
    }

    function update(updatedContent) {
        console.log(updatedContent)
        setList(() => {
            list[select].content = updatedContent;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
            return list;
        })
        setTempList(() => {
            tempList[select].content = updatedContent;
            return list;
        })
    }

    function search() {

        let tempArray = [];
        console.log(SearchTextField.current.value)
        console.log(list.length)
        if (SearchTextField.current.value === "") {
            setTempList(list);
        }
        else {
            for (var i = 0; i < list.length; i++) {

                if (list[i].name.substr(0, (SearchTextField.current.value).toString().length) === SearchTextField.current.value) {
                    console.log('matched')
                    tempArray.push(list[i]);
                }
                else {
                    tempArray.push(null);
                }
                console.log(tempArray)
            }
            setTempList(tempArray);
        }
    }

    return (
        <>
            <div class="container-fluid " style={{ height: '100%' }}>

                <div class="row">
                    <div class="col-sm-4 p-4 border">
                        <div class="row">
                            <div class="col-sm-10">
                                <div class="input-group mb-3">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text" id="basic-addon1">
                                            <img alt="" width="20" src={require('./assets/Search.webp')}></img></span>
                                    </div>
                                    <input class="form-control" style={{ width: '80%' }} ref={SearchTextField} onChange={search} type="text"></input>




                                    <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog" role="document">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title" id="exampleModalLabel">Title of your new list</h5>
                                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <input class="form-control" style={{ width: '80%' }} placeholder="Title goes here" ref={AddTextField} type="text"></input>

                                                </div>
                                                <div class="modal-footer">
                                                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                                    <button type="button" onClick={add} class="btn btn-primary" data-dismiss="modal">Create</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-1" style={{ marginTop: '-25px' }}>
                                <label style={{ fontSize: 50, color: "#809F44 " }} data-toggle="modal" data-target="#exampleModal">+</label>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col Scr myclass" style={{ overflowY: 'scroll' }}>
                                {
                                    tempList.map((Val, index) => {


                                        return (

                                            Val !== null ? <ListView key={index} value={Val} delfunc={delfunc} index={index} Selectflag={select} Callfunc={call} /> : null

                                        )
                                    }).reverse()}
                                {list.length <= 0 ? <center><img class="mt-5 pt-5" style={{ borderRadius: '20px' }} src={require('./assets/add-notes.svg')} width='40%'></img><br />
                                    <p class="mt-3 pt-5">No lists available! Start taking notes :)</p></center> : false}

                            </div>
                        </div>

                    </div>
                    <div class="col-sm-8 border border-dark"  >
                        <div class="p-3" style={{ fontSize: 25 }}> {headingVal.slice(0, 23)}</div>
                        <hr></hr>
                        <div>
                            <textarea class="myclass" ref={ContentTextField} rows={'20'} style={{ width: '100%', outlineColor: 'white', overflow: 'scroll', border: 'solid 1px white', display: select < 0 ? 'none' : 'block' }} onChange={() => update(ContentTextField.current.value)} ></textarea>
                            {select < 0 ? <center><img class="mt-5 pt-5" src={require('./assets/take-note-rev.png')} width="50%"></img></center> : false}
                        </div>
                    </div>
                </div>
            </div>



        </>
    );
}
