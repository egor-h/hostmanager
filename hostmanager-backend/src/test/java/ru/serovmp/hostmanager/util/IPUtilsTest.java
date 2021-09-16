package ru.serovmp.hostmanager.util;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import static org.junit.jupiter.api.Assertions.*;


class IPUtilsTest {

    @Test
    void ipAddressToByteRepr_givenCorrectAddress_expectedLongRepresentation() {
        String address = "192.168.0.1";
        long expectedAddress = 3232235521L;

        long conversionResult = IPUtils.ipAddressToByteRepr(address);

        assertEquals(expectedAddress, conversionResult);
    }

    @Test
    void ipAddressToByteRepr_givenWrongAddressWithBigOctet_expectedExceptionThrown() {
        String address = "192.168.500.0";

        assertThrows(RuntimeException.class, () -> IPUtils.ipAddressToByteRepr(address));
    }

    @Test
    void ipAddressToByteRepr_givenWrongAddressWithOctetLessThanZero_expectedExceptionThrown() {
        String address = "-1.168.0.1";

        assertThrows(RuntimeException.class, () -> IPUtils.ipAddressToByteRepr(address));
    }

    @Test
    void ipAddressToByteRepr_givenIpAddressWithNonNumericCharacter_expectedExceptionThrown() {
        String address = "192.168.0.asd";

        assertThrows(NumberFormatException.class, () -> IPUtils.ipAddressToByteRepr(address));
    }

    @Test
    void ipAddressToByteRepr_givenNonIpString_expectedExceptionThrown() {
        String address = "asdfg123";
        assertThrows(NumberFormatException.class, () -> IPUtils.ipAddressToByteRepr(address));
    }


    @Test
    void byteReprToIp_givenCorrectNumber_expectedCorrectStringRepresentation() {
        long ip = 2886732498L;
        String expectedAddress = "172.16.10.210";

        String ipStringRepresentation = IPUtils.byteReprToIp(ip);

        assertEquals(expectedAddress, ipStringRepresentation);
    }


    @Test
    void getHostId_givenAddressAndMask_expectedHostId() {
        long ip = 4294967169L; // 255.255.255.129
        long mask = 4294967168L; // 255.255.255.128
        long expectedHostId = 1; // 0.0.0.1

        long calculateHostId = IPUtils.getHostId(ip, mask);

        assertEquals(expectedHostId, calculateHostId);
    }

    @Test
    void getNetId() {
        long ip = 4294967169L; // 255.255.255.129
        long mask = 4294950912L; // 255.255.192.0
        long expectedNetId = 4294950912L; // 255.255.192.0

        long calculatedNetId = IPUtils.getNetId(ip, mask);

        assertEquals(expectedNetId, calculatedNetId);
    }

    @Test
    void isSubnetOf() {
        long ip = 3232236298L; // 192.168.3.10
        long mask = 4294966784L; // 255.255.254.0
        long netId = 3232236032L; // 192.168.2.0

        assertTrue(IPUtils.isSubnetOf(ip, mask, netId));
    }


    @ParameterizedTest
    @ValueSource(strings = {"192.1", "192", "..", "192.168.0.1    ", "192.168", "123123"})
    void looksLikeIp_onlyDigitsAndDots_returnTrue(String input) {
        assertTrue(IPUtils.looksLikeIp(input));
    }

    @ParameterizedTest
    @ValueSource(strings = {"192 1", "10-20", "!", "192.168.0,1", "asd", "123+123"})
    void looksLikeIp_notPartOfIp_returnFalse(String input) {
        assertFalse(IPUtils.looksLikeIp(input));
    }
}