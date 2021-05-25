package ru.serovmp.hostmanager.service.zabbix;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.web.client.RestTemplate;
import ru.serovmp.hostmanager.restentities.request.MethodNameable;
import ru.serovmp.hostmanager.restentities.request.ZabbixBaseRequest;

import static org.junit.jupiter.api.Assertions.assertSame;
import static org.mockito.Mockito.*;

@ExtendWith(SpringExtension.class)
class ZabbixClientTest {

    ZabbixClient client;

    RestTemplate restTemplate;

    @BeforeEach
    void setUp() {
//        mockitoSession().initMocks(this);
        restTemplate = mock(RestTemplate.class);
    }


    @Test
    void request_assertCalledWithCorrectParams_expectToReturnDummyEntityAndCallRestTemplate() {
        String host = "somehost";
//        ZabbixClient client = new ZabbixClient(host, restTemplate);
        MethodNameable requestObject = when(mock(MethodNameable.class).methodName()).thenReturn("Mockname").getMock();
        Object responseObj = new Object();
        when(restTemplate.postForEntity(anyString(), any(), any())).thenReturn(new ResponseEntity<>(responseObj, HttpStatus.OK));

        Object response = client.request(requestObject, Object.class, 0, "");

        verify(restTemplate, only()).postForEntity(startsWith(host), any(), any());
        assertSame(response, responseObj);
    }

    @Test
    void requst_assertCalledWithCorrectParams_putRequestIdAndAuthTokenIntoRequest() {
        ZabbixClient client = new ZabbixClient("", restTemplate);
        int requestId = 99;
        String authToken = "authToken";
        MethodNameable requestMock = when(mock(MethodNameable.class).methodName()).thenReturn("").getMock();
        when(restTemplate.postForEntity(anyString(), any(), any())).thenReturn(new ResponseEntity<>(new Object(), HttpStatus.OK));

        client.request(requestMock, Object.class, requestId, authToken);

        verify(restTemplate).postForEntity(anyString(), argThat(arg -> arg instanceof ZabbixBaseRequest), any());
        verify(restTemplate).postForEntity(anyString(), argThat(arg -> ((ZabbixBaseRequest) arg).getId() == requestId), any());
        verify(restTemplate).postForEntity(anyString(), argThat(arg -> ((ZabbixBaseRequest) arg).getAuth().equals(authToken)), any());
    }
}