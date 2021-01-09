package ru.serovmp.hostmanager.util;

public class IPUtils {
    public static long ipAddressToByteRepr(String ip) {
        String[] spt = ip.split("\\.");
        for (String octet: spt) {
            int o = Integer.parseInt(octet);
            if (o < 0 || o > 255) {
                throw new RuntimeException(String.format("Octet didn't pass check (must be 0..255, but got %d", o));
            }
        }
        return (Long.parseLong(spt[0]) << 24) | (Long.parseLong(spt[1]) << 16) | (Long.parseLong(spt[2]) << 8) | (Long.parseLong(spt[3]));
    }

    static long IP_OCTET1 = 0b00000000000000000000000011111111L;
    static long IP_OCTET2 = 0b00000000000000001111111100000000L;
    static long IP_OCTET3 = 0b00000000111111110000000000000000L;
    static long IP_OCTET4 = 0b11111111000000000000000000000000L;

    public static String byteReprToIp(long ip) {
        var octet1 = ip & IP_OCTET1;
        var octet2 = (ip & IP_OCTET2) >> 8;
        var octet3 = (ip & IP_OCTET3) >> 16;
        var octet4 = (ip & IP_OCTET4) >> 24;
        return String.format("%d.%d.%d.%d", octet4, octet3, octet2, octet1);
    }

    public static long getNetId(long ip, long mask) {
        return ip & mask;
    }

    static long FULL_MASK = 0b11111111111111111111111111111111L;
    public static long getHostId(long ip, long mask) {
        return (ip ^ mask) & FULL_MASK;
    }

    public static boolean isSubnetOf(long ip, long mask, long netId) {
        return getNetId(ip, mask) == netId;
    }
}
