import React, { Component } from 'react';
import { CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/bootstrap-react'
import { LightbulbFill, LightbulbOffFill, BsCheck } from 'react-bootstrap-icons';
import StepProgressBar from './DashBoard/StepProgressBar';
// import FetchSemisteps from './DashBoard/FetchSemisteps';


const express = require('express')
const app = express()

const server = app.listen(3000, () => {
    console.log('server start, port 3000')
})

const oracledb = require('oracledb')
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

app.get('/select', function(request, response) {
    getSelect(request, response)
})

async function getSelect(request, response) {
    let connection
    try {
        connection = await oracledb.getConnection({
            user          : "system",
            password      : "패스워드",
            connectString : "orcl"
        })

        const result = await connection.execute(
            `SELECT * 
            FROM TB_GENERAL`
        )

        console.log(result)
        response.send(result.rows)
    } catch (error) {
        console.log(error)
    } finally {
        if (connection) {
            try {
                await connection.close()
            } catch (error) {
                console.log(error)
            }
        }
    }
}


export default function DashBoard() {

  // let data = <FetchSemisteps url="/dashboard" />;
  // console.log(data);
  let data = [];
  
  // (function setDataCellIfJsonExists() {
  //   const aunfList = Object.keys(dbFe.aunfList);
  //   aunfList.map((a, i) => {
  //     data.push({
  //       "AUNF_CD": dbFe.aunfList[a].AUNF_CD,
  //       "AUNF_NM": dbFe.aunfList[a].AUNF_NM
  //     });
  //   });
  // })();

  return (
    <>
      <CTable>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope="col">#</CTableHeaderCell>
            <CTableHeaderCell scope="col">AUNF_CD</CTableHeaderCell>
            <CTableHeaderCell scope="col">AUNF_NM</CTableHeaderCell>
            <CTableHeaderCell scope="col">진행상황</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {data.map((a, i) => {
            return (<CTableRow>
                <CTableHeaderCell scope="row">{i+1}</CTableHeaderCell>
                {/* <CTableDataCell>{a.AUNF_CD}</CTableDataCell>
                <CTableDataCell>{a.AUNF_NM}</CTableDataCell> */}
                {/* <CTableDataCell><LightbulbFill color="gold" />미정</CTableDataCell>
                <CTableDataCell><LightbulbOffFill color="gray" />미정</CTableDataCell> */}
                <CTableDataCell><StepProgressBar cd={i+1} /></CTableDataCell>
              </CTableRow>);
          })}
        </CTableBody>
      </CTable>
    </>
  );
};
