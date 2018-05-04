import React, { Component } from 'react';
import PropTypes from 'prop-types'
// Material Styles
import { withStyles } from 'material-ui/styles';
// Material design components
import Typography from 'material-ui/Typography';
import Paper from 'material-ui/Paper';
import Icon from 'material-ui/Icon';
import TextField from 'material-ui/TextField';
import { GaugeGraph } from "./carbon-addons-data-viz-react";
import Grid from 'material-ui/Grid';
import { FormControl } from 'material-ui/Form';
import Input, { InputLabel } from 'material-ui/Input';
import { DataTable } from 'carbon-components-react';
import Button from 'material-ui/Button';
// /
// Constants
const {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    TableExpandHeader,
    TableHeader,
    TableExpandRow,
    TableExpandedRow,
    TableToolbar,
    TableToolbarSearch,
    TableToolbarContent
} = DataTable;
const headers = [
    {
        key: "id",
        header: "SI No."
    },
    {
        key: "name",
        header: "Users"
    },
    {
        key: "membof",
        header: "Member of"
    },
    {
        key: "status",
        header: "Status"
    },
    {
        key: "actions",
        header: "Actions"
    },
    ];
const styles = theme => ({
    root: {
        textAlign: 'left',
        height:'582px',
        background:'transparent'
    },
    welcomeText:{
        color:'#78C893'
    },
    adminDash:{
        background: "#2B2B2B",
        marginTop:20,
        height:150,
        flexGrow:1
    },
    gauge:{
        marginTop:-20,
        background:'transparent',
        textAlign:'left'
    },
    dashText:{
        marginLeft:30,
        color:'#78C893',
        marginTop:-20,
    },
    tableContainer: {
        marginLeft: 5
    },
    tableDiv:{
        marginTop:40
    },
    dataTable:{
        marginTop:40
    },
    divSearch:{
        display: 'inline-block',
    },
    divCont:{
        display: 'inline-block',
        marginLeft:480
    },
    addButton:{
        backgroundColor:'#78C893',
        color:'#F3FFF7',
        height:12,
        fontSize:12,
        '&:hover' :{
            background: '#78C893',
        }
    },
    mainHead: {
        background: '#2B2B2B',
        color:'#78C893'
    },
});

class Dashboard extends Component {
render() {
    const { classes,permission} = this.props;
    return (
<div className={classes.root}>
    <Typography type="body1" component='h4' className={classes.welcomeText}>
        Admin Dashboard
    </Typography>
    <div className={classes.adminDash} >
    <Grid container  spacing={24}>
    <Grid item xs={6} sm={3}>
    <div className={classes.gauge}>
    <GaugeGraph tooltipId={"gauge1"} fillColor='#78C893' radius={40} amount={36} total={50} labelText={""} valueText={"36"} />
    <Typography type="body1" component='h4' className={classes.dashText}>
        Text Inserting
    </Typography>
  </div>
  </Grid>
  <Grid item xs={6} sm={3}>
  <div className={classes.gauge}>
    <GaugeGraph tooltipId={"gauge2"} fillColor='#78C893' radius={40} amount={17} total={50} labelText={""} valueText={"17"} />
    <Typography type="body1" component='h4' className={classes.dashText}>
        Under Transaction
    </Typography>
  </div>
  </Grid>
  <Grid item xs={6} sm={3}>
  <div className={classes.gauge}>
    <GaugeGraph tooltipId={"gauge3"} fillColor='#78C893' radius={40} amount={9} total={50} labelText={""} valueText={"9"} />
    <Typography type="body1" component='h4' className={classes.dashText}>
        Completed
    </Typography>
  </div>
  </Grid>
  <Grid item xs={6} sm={3}>
  <div className={classes.gauge}>
    <GaugeGraph tooltipId={"gauge4"} fillColor='#78C893' radius={40} amount={36} total={50} labelText={""} valueText={"37"} />
    <Typography type="body1" component='h4' className={classes.dashText}>
        Total Project
    </Typography>
  </div>
  </Grid>
  </Grid>
    </div>     
    <div className={classes.tableDiv}>  
    <DataTable 
      rows={[{id: "1", name: "johndoe", membof: "John Deo-Organization",status:"1",actions:"D"},{id: "2", name: "johndoe", membof: "John Deo-Organization",status:"1",actions:"D"}]}
      headers={headers}
      render={({ rows, headers, getHeaderProps,getRowProps, onInputChange}) => (
        <TableContainer className={classes.tableContainer}>
        <TableToolbar>
            <div>
                <div className={classes.divSearch} >
                    <TableToolbarSearch  onChange={onInputChange}  />
                </div>
                <div className={classes.divCont} >
                    <TableToolbarContent >
                        <Button small kind="primary" className={classes.addButton} >
                        <Icon className={classes.rightIcon}>add_circle_outline</Icon>
                        Add new Project
                        </Button>
                    </TableToolbarContent>
                </div>
            </div>
        </TableToolbar>
          <Table className={classes.dataTable}>
            <TableHead>
            <TableRow className={classes.mainHead}>
            <TableExpandHeader />
            {headers.map((header, index) => (
                   <TableHeader  {...getHeaderProps({ header }) } style={index === 2 ? { width: '17%', textAlign: 'left' } : { textAlign: 'left' }}>
                   <span>{header.header}</span>
               </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            {rows.map((row, index) => (
            <TableBody>
              {console.log(row)}
              <TableExpandRow key={index} {...getRowProps({ row }) }>

                
           </TableExpandRow>
            </TableBody>
              ))}
          </Table>
        </TableContainer>
      )}
    />
    </div>
</div>
    )
}
}
Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Dashboard);