/**
 * Appcelerator Titanium Mobile
 * This is generated code. Do not modify. Your changes *will* be lost.
 * Generated code is Copyright (c) 2009-2010 by Appcelerator, Inc.
 * All Rights Reserved.
 */
#import <Foundation/Foundation.h>
#import "ApplicationRouting.h"

extern NSData * decode64 (NSData * thedata); 
extern NSData * dataWithHexString (NSString * hexString);
extern NSData * decodeDataWithKey (NSData * thedata, NSString * key);

@implementation ApplicationRouting

+ (NSData*) resolveAppAsset:(NSString*)path;
{
     static NSMutableDictionary *map;
     if (map==nil)
     {
         map = [[NSMutableDictionary alloc] init];
         [map setObject:dataWithHexString(@"54692e55492e7365744261636b67726f756e64436f6c6f7228272330303027293b76617220706174683d54692e46696c6573797374656d2e7265736f75726365734469726563746f72792b222f7777772f696e6465782e68746d6c223b54692e4150492e696e666f2870617468293b76617220776562766965773d54692e55492e63726561746557656256696577287b75726c3a706174687d293b7661722077696e333d54692e55492e63726561746557696e646f77287b6e617642617248696464656e3a747275657d293b77696e332e6164642877656276696577293b77696e332e6f70656e287b6d6f64616c3a747275657d293b") forKey:@"app_js"];
     }
     return [map objectForKey:path];
}

@end
