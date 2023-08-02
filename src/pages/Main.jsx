import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import YearSelector from './../components/YearSelector';
import LocationSelector from './../components/LocationSelector.jsx'
import { useNavigate  } from 'react-router-dom';


function Main() {
    const submitHandler = (event) => {
        event.preventDefault();
    }

    const getCoordinates = (lat, lng) => {
        formData['lat'] = lat;
        formData['lng'] = lng;
    };

    let formData = {
        'lat': 41.876,
        'lng': -87.640,
        'stat_type': 'median',
        'start_year': 2016,
        'end_year': 2022
    };

    const navigate = useNavigate();
    const submitForm = () => navigate('/results', { state: formData });

    return (
        <div>
            <Container>
                <Row className="justify-content-md-center">
                    <Col xs lg="6">
                        <h1 className="mt-5">Weather Simulator</h1>
                        <p>
                            Please select a location and range of years. The simulator will then use data from those years to simulate hourly temperatures for a hypothetical year similar to a typical meteorological year (TMY). Note that the years are inclusive.
                        </p>
                        <Form onSubmit={submitHandler}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formStartYear">
                                    <Form.Label>Start Year</Form.Label>
                                    <YearSelector defaultValue="2016" onChange={(value) => { formData['start_year'] = value }} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formEndYear">
                                    <Form.Label>End Year</Form.Label>
                                    <YearSelector onChange={(value) => { formData['end_year'] = value }} />
                                </Form.Group>
                            </Row>

                            <LocationSelector onMapUpdate={getCoordinates} />

                            <Form.Group className="mb-3" controlId="formStatType" style={{ marginTop: 10 }}>
                                <Form.Label>Statistic Type</Form.Label>
                                <Form.Select aria-label="Default select example" onChange={(e) => formData['stat_type'] = e.target.value} >
                                    <option value="median">Median</option>
                                    <option value="max">Max</option>
                                    <option value="sum">Sum</option>
                                    <option value="mean">Mean</option>
                                </Form.Select>
                            </Form.Group>

                            <Button variant="primary" style={{ marginBottom: 15 }} onClick={submitForm}>
                                Start
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Main;
